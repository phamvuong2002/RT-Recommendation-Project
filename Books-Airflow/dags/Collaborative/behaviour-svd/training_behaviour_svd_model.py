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

def process_behaviors():
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    print('ff')
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
    
    grouped_df = df.groupby(['personId', 'contentId']).sum().reset_index()  
     

    return grouped_df

def training_model(ti):
    grouped_df=ti.xcom_pull(task_ids='process_behaviors')
    print(grouped_df)
    max_eventStrength=max(grouped_df['eventStrength'].values)
    reader = Reader(rating_scale=(0, max_eventStrength))
   
    data = Dataset.load_from_df(grouped_df[['personId', 'contentId', 'eventStrength']], reader)

    algo_pp=SVDpp()
    algo_pp.fit(data.build_full_trainset())

    # Chuyển đổi mô hình thành pickle
    behaviour_svd_model_pickle = pickle.dumps(algo_pp)
    behaviour_svd_grouped_df_pickle = pickle.dumps(grouped_df)
    # testset_pickle = pickle.dumps(testset)
   

    ti.xcom_push(key='behaviour_svd_model_pickle', value=behaviour_svd_model_pickle)
    ti.xcom_push(key='behaviour_svd_grouped_df_pickle', value=behaviour_svd_grouped_df_pickle)
  


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
    print('before')
    file_names = []
    file_names.append(behaviour_svd_model_pickle)
    file_names.append(behaviour_svd_grouped_df_pickle)

    model_type = "behaviour_svd"
    print(model_type)
     # Địa chỉ URL của API
    url = "http://192.168.2.10:4123/offline/get-models"
    
    try:
        print('in try')
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
    dag_id='training_behaviour_svd_model',
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

    task_saving_model = PythonOperator(
        task_id='saving_model',
        python_callable=save_model
    )

    task_send_message = PythonOperator(
        task_id='send_message',
        python_callable=send_message
    )
    
    task_process_behaviors >> task_training_model >> task_saving_model >> task_send_message
   