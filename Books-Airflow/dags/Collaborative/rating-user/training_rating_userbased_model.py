from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from datetime import timedelta, datetime
import pandas as pd
from sqlalchemy import create_engine, text
import scipy.sparse as sparse
import implicit
import pickle
import boto3
import time
import requests
from airflow import DAG
from datetime import timedelta, datetime
from surprise import Dataset, SVD, Reader
from surprise import SVDpp, accuracy
from surprise.model_selection import GridSearchCV   , train_test_split
from airflow.operators.python import PythonOperator
from sklearn.metrics.pairwise import cosine_similarity
from airflow.providers.redis.hooks.redis import RedisHook
import pandas as pd
import redis
import scipy.sparse as sparse
from surprise.prediction_algorithms.knns import KNNBasic
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 5, 13),
    'email': ['bookadahcmus@gmail.com'],
    'email_on_failure': True,
    'email_on_retry': True,
    'retries': 2,
    'retry_delay': timedelta(minutes=2)
}


def process_rating():
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    
    # Đọc tất cả dữ liệu từ bảng user_behaviour vào DataFrame
    query_all_feedback = """
        SELECT u.user_sid AS `User-ID`, b.book_id AS `Book-ID`, fb.feedback_rating AS `Book-Rating`FROM book b join feedback fb on b.book_id = fb.feedback_bookid join user u on u.user_id=fb.feedback_userid;
    """

    with db_connection.connect() as conn:
        df = pd.read_sql(
            sql=query_all_feedback,
            con=conn.connection
        )

    df['Book-Rating'] = df['Book-Rating'].astype(int)
    min_book_ratings = 1
    filter_books = df['Book-ID'].value_counts() > min_book_ratings
    filter_books = filter_books[filter_books].index.tolist()

    min_user_ratings = 1
    filter_users = df['User-ID'].value_counts() > min_user_ratings
    filter_users = filter_users[filter_users].index.tolist()

    df_new = df[(df['Book-ID'].isin(filter_books)) & (df['User-ID'].isin(filter_users)) & (df['Book-Rating']>0)]


    return df_new   

def training_model(ti):
    grouped_df=ti.xcom_pull(task_ids='process_rating')
    print(grouped_df)
    reader = Reader(rating_scale=(0, 5))
    data = Dataset.load_from_df(grouped_df[['Book-ID', 'User-ID', 'Book-Rating']], reader)
    param_grid = {'k': [10, 20, 30], 'min_k': [3, 6, 9],
              'sim_options': {'name': ['msd', 'cosine','pearson','pearson_baseline'],
                              'user_based': [True], 'min_support':[2,4]}
              }

    # Performing 3-fold cross validation to tune the hyperparameters
    gs = GridSearchCV(KNNBasic, param_grid, measures=['rmse'], cv=3, n_jobs=-1)

    # Fitting the data
    gs.fit(data)

    # Best RMSE score
    # print(gs.best_score['rmse'])
    # Combination of parameters that gave the best RMSE score
    # print(gs.best_params['rmse'])
    algo_knn = gs.best_estimator["rmse"]    
    algo_knn.fit(data.build_full_trainset())

    # Chuyển đổi mô hình thành pickle
    rating_user_model_pickle = pickle.dumps(algo_knn)
    rating_user_grouped_df_pickle = pickle.dumps(grouped_df)
    # testset_pickle = pickle.dumps(testset)
   

    ti.xcom_push(key='rating_user_model_pickle', value=rating_user_model_pickle)
    ti.xcom_push(key='rating_user_grouped_df_pickle', value=rating_user_grouped_df_pickle)
  


def save_model(ti):
    rating_user_model_pickle = ti.xcom_pull(key='rating_user_model_pickle')
    rating_user_grouped_df_pickle = ti.xcom_pull(key='rating_user_grouped_df_pickle')

    # Thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "rating_user"

    # Upload the model file to S3
    s3 = boto3.client(
        's3',
        aws_access_key_id="AKIA3SH5ODCFFA4AA3JI",
        aws_secret_access_key="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",
        region_name="ap-southeast-1"
    )
    # Lưu tệp pickle lên S3
    bucket_name = 'bookada-saving-model-airflow'
    #model_pickle
    model_file_name = f'knn_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=model_file_name, Body=rating_user_model_pickle)
    #grouped_df_pickle
    grouped_df_file_name = f'grouped_df_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=grouped_df_file_name, Body=rating_user_grouped_df_pickle)

    #Lưu Thông tin vào DB
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.close()

    #push file names on Xcom
    ti.xcom_push(key='rating_user_model_pickle_name', value=model_file_name)
    ti.xcom_push(key='rating_user_grouped_df_pickle_name', value=grouped_df_file_name)

    #Gọi gửi thông báo đến server python
    return "Training Successfully"


def send_message(ti):
    rating_user_model_pickle = ti.xcom_pull(key='rating_user_model_pickle_name')
    rating_user_grouped_df_pickle = ti.xcom_pull(key='rating_user_grouped_df_pickle_name')
    # predictions=ti.xcom_pull(key='predictions')
    file_names = []
    file_names.append(rating_user_model_pickle)
    file_names.append(rating_user_grouped_df_pickle)

    model_type = "rating_user"

     # Địa chỉ URL của API
    url = "http://192.168.2.10:4123/offline/get-models"
    
    try:
        for file_name in file_names:
            # Tạo payload cho yêu cầu HTTP
            payload = {
                "model_name": file_name,
                "model_type": model_type
            }
            # Gửi yêu cầu POST đến API với payload
            response = requests.post(url, json=payload)
        
            # Kiểm tra mã trạng thái của yêu cầu
            if response.status_code == 200:
                print("Yêu cầu thành công!")
            else:
                print(f"Lỗi: {response.status_code}")
    except Exception as e:
        print(f"Lỗi khi gửi yêu cầu: {str(e)}")



with DAG(
    dag_id='training_rating_userbased_model',
    default_args=default_args,
    schedule_interval=None,  # Không lên lịch tự động, chỉ kích hoạt thủ công
    catchup=False
) as dag:
    task_process_rating = PythonOperator(
        task_id='process_rating',
        python_callable=process_rating
    )

    task_training_model = PythonOperator(
        task_id='training_model',
        python_callable=training_model
    )

    task_saving_model = PythonOperator(
        task_id='saving_model',
        python_callable=save_model
    )

    task_send_message = PythonOperator(
        task_id='send_message',
        python_callable=send_message
    )
   

    task_process_rating >> task_training_model >> task_saving_model >> task_send_message