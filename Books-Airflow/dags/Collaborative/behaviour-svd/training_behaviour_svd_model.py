from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from datetime import timedelta, datetime
import pandas as pd

from sqlalchemy import create_engine, text, select, MetaData, desc  
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
import math
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


def smooth_user_preference(x):
    return math.log(1+x, 2)

def get_trained_user():
    min_Score=10
    r = redis.Redis( host= "redis-18188.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port= 18188,password="BPCJVK6TcHKjsliR97SBnFp3BtsZcGWB")
    sorted_set_key = 'user-score'
    sorted_set_data = r.zrange(sorted_set_key, 0, -1, withscores=True)
    rows = []
    for item in sorted_set_data:
         # Decode byte string và phân tách person_id và content_id
        personid_str, behaviour_score = item
        # Thêm dòng mới vào danh sách
        if(behaviour_score>min_Score):
            rows.append((personid_str.decode('utf-8')))
        else: continue
    

    return rows

def process_behaviors():
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
   
    # Đọc tất cả dữ liệu từ bảng user_behaviour vào DataFrame
    query_all_behaviours = """
        SELECT DISTINCT ub_sid as behaviour_id, ub_user_id as personId, ub_behaviour_type as eventType, ub_product_id as contentId
        FROM user_behaviour 
        WHERE ub_sid IS NOT NULL AND ub_sid <> ''
        AND ub_user_id IS NOT NULL AND ub_user_id <> ''
        AND ub_behaviour_type IS NOT NULL AND ub_behaviour_type <> ''
        AND ub_product_id IS NOT NULL AND ub_product_id <> '';
    """

    with db_connection.connect() as conn:
        df = pd.read_sql(
            sql=query_all_behaviours,
            con=conn.connection
        )

    SCORE = {
        "view": 2,
        "click": 1,
        "place-order": 5,
        "cancel-order": 3,
        "add-to-cart": 3,
        "love": 3,
    }

    df['eventStrength'] = df['eventType'].apply(lambda x: SCORE[x])
    grouped_df = df.groupby(['personId', 'contentId'])['eventStrength'].sum().apply(smooth_user_preference).reset_index()
     
    return grouped_df

def training_model(ti):
    grouped_df=ti.xcom_pull(task_ids='process_behaviors')
    print(grouped_df)

    min_r=grouped_df['eventStrength'].min()
    max_r=grouped_df['eventStrength'].max()
    # Scale điểm min_r, max_r sau khi đã biến đổi rating
    reader=Reader(rating_scale=(min_r, max_r))
    data_scale_max= Dataset.load_from_df(grouped_df[['personId', 'contentId', 'eventStrength']], reader)

    trainset=data_scale_max.build_full_trainset()
    
    param_grid = {"n_epochs": [5, 10], "lr_all": [0.001, 0.008], "reg_all": [0.4, 0.6]}
    gs = GridSearchCV(SVDpp, param_grid, measures=["rmse", "mae"], cv=3)
    gs.fit(data_scale_max)
    algo_pp=gs.best_estimator['rmse']
    algo_pp.fit(trainset)

    n_similar=24
   
    trained_user=get_trained_user()
    # print('trained ',trained_user)
    # print('before')
 
    recommendation_lists=[]
    for i in range(len(trained_user)):
        user=trained_user[i]
        interacted_book = grouped_df.loc[grouped_df['personId']==user,'contentId'].unique()
        # print('INTERACTED BOOK', grouped_df.loc[grouped_df['personId']==user,'contentId'].unique())
        
        list_of_unrated_book = grouped_df.loc[(~grouped_df['contentId'].isin(interacted_book)),'contentId'].unique()
       
        # set up user set with unrated books
        # print('unrated ',list_of_unrated_book)
        user_set = [[user, item_id, 0] for item_id in list_of_unrated_book]
      
        # generate predictions based on user set
        predictions_pp= algo_pp.test(user_set)
        df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
        df=df.rename(columns={'uid':'user_id','iid': 'book_id', 'est': 'score'})
        top_n_recommendations = df[['user_id','book_id','score']].sort_values('score',ascending=False).drop_duplicates('book_id')[:n_similar]
        
        recommendation_lists.append(top_n_recommendations)
    
   
    # Chuyển đổi mô hình thành pickle
    behaviour_svd_model_pickle = pickle.dumps(algo_pp)
    behaviour_svd_grouped_df_pickle = pickle.dumps(grouped_df)
    

    ti.xcom_push(key='behaviour_svd_model_pickle', value=behaviour_svd_model_pickle)
    ti.xcom_push(key='behaviour_svd_grouped_df_pickle', value=behaviour_svd_grouped_df_pickle)
    ti.xcom_push(key='final_result_svd',value=recommendation_lists)
    
  


def save_user_recommendations_to_mysql(ti) :
    recommendation_lists=ti.xcom_pull(key='final_result_svd')

    # db_connection_str = f"mysql+pymysql://root:vuong@127.0.0.1/books_db_v1"
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    # Khởi tạo metadata
    metadata = MetaData()
    metadata.reflect(bind=db_connection)

      # Object để truy vấn
    book_table = metadata.tables['book']
    rec_model = metadata.tables['rec_model']
    rec_session = metadata.tables['rec_session']
    rec_book = metadata.tables['rec_book']
    model_type='behaviour_svd'
    rec_books = []
    try:
        with db_connection.connect() as conn:
            #Tìm model mới nhất
            query = select(text('rec_model_id')).where(rec_model.c.rec_model_type == model_type).order_by(desc(rec_model.c.create_time)).limit(1)
            result = conn.execute(query)
            result = result.fetchone()
            rec_model_id = result[0]
            #Tạo session
            result = conn.execute(rec_session.insert().values(
                rec_model_id = rec_model_id
            ))
            last_inserted_id = result.lastrowid

            for i in range(len(recommendation_lists)):
                user_i=recommendation_lists[i]
                books=user_i['book_id']
                user=user_i['user_id'].unique()
                user_id=user[0]
            #Lưu thông tin sách
                for book in books:
                    #tìm thông tin sách
                    bookId = int(book)
                    query = select(text('book_id'), text('book_title'), text('book_spe_price'), text('book_old_price'), text('book_img'), text('book_status'), text('book_categories')).where(book_table.c.book_id == bookId)
                    result = conn.execute(query)
                    book_info = result.fetchone()
                    if book_info:
                        book_data = {
                            "bookId": book_info[0],
                            "bookTitle": book_info[1],
                            "bookSpePrice": book_info[2],
                            "bookOldPrice": book_info[3],
                            "bookImg": book_info[4],
                            "bookStatus": book_info[5],
                            "bookCategory": book_info[6]
                        }
                        #return recommended book data
                        rec_books.append(book_data)
                    
                        #xử lý thể loai
                        book_category_str = book_data['bookCategory']
                        book_category_str = book_category_str.strip('[]')
                        book_category_list = book_category_str.split(',')
                        book_category_list = [int(x) for x in book_category_list]

                        #lưu thông tin vừa tìm được vào bảng rec_book
                        if(book_data["bookStatus"] == 1):
                            #lưu vào mysql 
                            conn.execute(rec_book.insert().values(
                                rec_session_id = last_inserted_id,
                                rec_user_sid = user_id,
                                rec_book_id = book_data['bookId'],
                                rec_book_title = book_data['bookTitle'],
                                rec_book_img = book_data['bookImg'],
                                rec_book_spe_price = book_data['bookSpePrice'],
                                rec_book_old_price = book_data['bookOldPrice'],
                                rec_book_categories = book_category_list #book_data['bookCategory'] #book_data['bookCategory']
                            ))

                            #lưu vào redis
                            # insert_books_to_sorted_set(user_id=user_id, rec_session_id=last_inserted_id, book_info=book_data)
                    else:
                        print("Không tìm thấy thông tin cho sách với bookID", str(bookId))
                                    
            conn.commit()
    except Exception as e:
        return f'ETL Failed: {e}'
   
    return 'ETL successfully'


def save_model(ti):
    behaviour_svd_model_pickle = ti.xcom_pull(key='behaviour_svd_model_pickle')
    behaviour_svd_grouped_df_pickle = ti.xcom_pull(key='behaviour_svd_grouped_df_pickle')
    print(behaviour_svd_model_pickle)
    print(behaviour_svd_grouped_df_pickle)
    # Thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "behaviour_svd"

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
    model_file_name = f'svd_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=model_file_name, Body=behaviour_svd_model_pickle)
    #grouped_df_pickle
    grouped_df_file_name = f'grouped_df_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=grouped_df_file_name, Body=behaviour_svd_grouped_df_pickle)

    #Lưu Thông tin vào DB
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.close()

    #push file names on Xcom
    ti.xcom_push(key='behaviour_svd_model_pickle_name', value=model_file_name)
    ti.xcom_push(key='behaviour_svd_grouped_df_pickle_name', value=grouped_df_file_name)
 
    #Gọi gửi thông báo đến server python
    return "Training Successfully"


def send_message(ti):
    behaviour_svd_model_pickle = ti.xcom_pull(key='behaviour_svd_model_pickle_name')
    behaviour_svd_grouped_df_pickle = ti.xcom_pull(key='behaviour_svd_grouped_df_pickle_name')
    # predictions=ti.xcom_pull(key='predictions')

    file_names = []
    file_names.append(behaviour_svd_model_pickle)
    file_names.append(behaviour_svd_grouped_df_pickle)

    model_type = "behaviour_svd"

     # Địa chỉ URL của API
    url = "http://192.168.2.34:4123/offline/get-models"
    
    try:
        for file_name in file_names:
            # Tạo payload cho yêu cầu HTTP
            payload = {
                "model_name": file_name,
                "model_type": model_type
            }
            # Gửi yêu cầu POST đến API với payload
            response = requests.post(url, json=payload)
            print('after post')
            # Kiểm tra mã trạng thái của yêu cầu
            if response.status_code == 200:
                print("Yêu cầu thành công!")
            else:
                print(f"Lỗi: {response.status_code}")
    except Exception as e:
        print(f"Lỗi khi gửi yêu cầu: {str(e)}")



with DAG(
    dag_id='training_behaviour_svd_model_02',
    default_args=default_args,
    schedule_interval=None,  # Không lên lịch tự động, chỉ kích hoạt thủ công
    catchup=False
) as dag:
    task_process_behaviors = PythonOperator(
        task_id='process_behaviors',
        python_callable=process_behaviors
    )

    task_training_model = PythonOperator(
        task_id='training_model',
        python_callable=training_model
    )

    task_save_recommendation_mysql = PythonOperator(
        task_id='save_rec_to_mysql',
        python_callable=save_user_recommendations_to_mysql
    )

    task_saving_model = PythonOperator(
        task_id='saving_model',
        python_callable=save_model
    )

    task_send_message = PythonOperator(
        task_id='send_message',
        python_callable=send_message
    )
    
    task_process_behaviors >> task_training_model >> task_saving_model >> task_save_recommendation_mysql >> task_send_message
   