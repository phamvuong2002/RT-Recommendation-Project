from airflow import DAG
from airflow.operators.dummy_operator import DummyOperator
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from datetime import timedelta, datetime, date
import time
import pickle
import requests
import boto3
import pandas as pd
from sqlalchemy import create_engine, text

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 5, 27),
    'email': ['bookadahcmus@gmail.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=2)
}

def check_db_is_changed():
    # Kết nối đến cơ sở dữ liệu
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str, future = True)

    # Đọc dữ liệu từ MySQL và lưu vào DataFrame
    books_query = """
    select create_time as ctime_book, update_time as utime_book from book;
    """
    cate1_query = """
    select create_time as ctime_cate1, update_time as utime_cate1 from category_1;
    """
    cate2_query = """
    select create_time as ctime_cate2, update_time as utime_cate2 from category_2;
    """
    cate3_query = """
    select create_time as ctime_cate3, update_time as utime_cate3 from category_3;
    """
    cate4_query = """
    select create_time as ctime_cate4, update_time as utime_cate4 from category_4;
    """
    with db_connection.connect() as conn:

        books_df = pd.read_sql_query(sql=books_query, con=conn.connection)
        books_df['ctime_book'] = pd.to_datetime(books_df['ctime_book']).dt.strftime('%Y-%m-%d')
        books_df['utime_book'] = pd.to_datetime(books_df['utime_book']).dt.strftime('%Y-%m-%d')
        ctime_book = books_df['ctime_book'].values
        utime_book = books_df['utime_book'].values
        

        cate1_df = pd.read_sql(sql=cate1_query, con = conn.connection)
        cate1_df['ctime_cate1'] = pd.to_datetime(cate1_df['ctime_cate1']).dt.strftime('%Y-%m-%d')
        cate1_df['utime_cate1'] = pd.to_datetime(cate1_df['utime_cate1']).dt.strftime('%Y-%m-%d')
        ctime_cate1 = cate1_df['ctime_cate1'].values
        utime_cate1 = cate1_df['utime_cate1'].values
        
        cate2_df = pd.read_sql(sql=cate2_query, con = conn.connection)
        cate2_df['ctime_cate2'] = pd.to_datetime(cate2_df['ctime_cate2']).dt.strftime('%Y-%m-%d')
        cate2_df['utime_cate2'] = pd.to_datetime(cate2_df['utime_cate2']).dt.strftime('%Y-%m-%d')
        ctime_cate2 = cate2_df['ctime_cate2'].values
        utime_cate2 = cate2_df['utime_cate2'].values

        cate3_df = pd.read_sql(sql=cate3_query, con = conn.connection)
        cate3_df['ctime_cate3'] = pd.to_datetime(cate3_df['ctime_cate3']).dt.strftime('%Y-%m-%d')
        cate3_df['utime_cate3'] = pd.to_datetime(cate3_df['utime_cate3']).dt.strftime('%Y-%m-%d')
        ctime_cate3 = cate3_df['ctime_cate3'].values
        utime_cate3 = cate3_df['utime_cate3'].values

        cate4_df = pd.read_sql(sql=cate4_query, con = conn.connection)
        cate4_df['ctime_cate4'] = pd.to_datetime(cate4_df['ctime_cate4']).dt.strftime('%Y-%m-%d')
        cate4_df['utime_cate4'] = pd.to_datetime(cate4_df['utime_cate4']).dt.strftime('%Y-%m-%d')
        ctime_cate4 = cate4_df['ctime_cate4'].values
        utime_cate4 = cate4_df['utime_cate4'].values



        today = date.today()
        isChanged = False
        for i in range(len(ctime_book)):
            if (ctime_book[i] == today) or (utime_book[i] == today):
                isChanged = True
                break
        for i in range(len(ctime_cate1)):
            if (ctime_cate1[i] == today) or (utime_cate1[i] == today):
                isChanged = True
                break
        for i in range(len(ctime_cate2)):
            if (ctime_cate2[i] == today) or (utime_cate2[i] == today):
                isChanged = True
                break
        for i in range(len(ctime_cate3)):
            if (ctime_cate3[i] == today) or (utime_cate3[i] == today):
                isChanged = True
                break
        for i in range(len(ctime_cate4)):
            if (ctime_cate4[i] == today) or (utime_cate4[i] == today):
                isChanged = True
                break
        
        if (isChanged == False):
            print(f"Không cần cập nhật model")
            return "skip_create_model"
            # return "create_model"
        else:
            print(f"Có sự tạo mới!")
            return "create_model"
            # return "skip_create_model"



def create_model(ti):
    # Kết nối đến cơ sở dữ liệu
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str, future = True)

    # Đọc dữ liệu từ MySQL và lưu vào DataFrame
    books_query = """
    SELECT book_id, book_title, book_categories, cate1_name, cate2_name, cate3_name, cate4_name 
    FROM book 
    JOIN category_1 ON cate1_id = JSON_EXTRACT(book_categories, '$[0]')
    JOIN category_2 ON cate2_id = JSON_EXTRACT(book_categories, '$[1]')
    JOIN category_3 ON cate3_id = JSON_EXTRACT(book_categories, '$[2]')
    JOIN category_4 ON cate4_id = JSON_EXTRACT(book_categories, '$[3]')
    """

    try:
        with db_connection.connect() as conn:
            books_df = pd.read_sql_query(sql=books_query, con=conn.connection)
             # Gom các cột cate lại thành 1 cột duy nhất
            books_df['genres'] = books_df.apply(lambda row: ', '.join([row['cate1_name'], row['cate2_name'], row['cate3_name'], row['cate4_name']]), axis=1)

            # Loại bỏ các cột
            books_df.drop(['book_categories','cate1_name', 'cate2_name', 'cate3_name', 'cate4_name'], axis=1, inplace=True)

            model_pickle = pickle.dumps(books_df)
            ti.xcom_push(key='model_content_base_pickle', value=model_pickle)
            
            conn.commit()
    except Exception as e:
        return f'ETL Failed: {e}'

    return f'Create success!'

def save_model(ti):
    model_pickle = ti.xcom_pull(key='model_content_base_pickle')
    # print("MODELLLLLLLLLLL", model_pickle)
    # Thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "content"

    # Upload the model file to S3
    s3 = boto3.client(
        's3',
        aws_access_key_id="AKIA3SH5ODCFFA4AA3JI",
        aws_secret_access_key="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",
        region_name="ap-southeast-1"
    )
    # Lưu tệp pickle lên S3
    bucket_name = 'bookada-saving-model-airflow'
    model_file_name = f'content_base_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=model_file_name, Body=model_pickle)

    
    #Lưu Thông tin vào DB
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.close()

    #push file names on Xcom
    ti.xcom_push(key='model_pickle_name', value=model_file_name)

    #Gọi gửi thông báo đến server python
    return "Training Successfully"


def send_message(ti):
    model_pickle = ti.xcom_pull(key='model_pickle_name')
    file_names = []
    file_names.append(model_pickle)
    model_type = "content"

     # Địa chỉ URL của API
    url = "http://192.168.1.5:4123/offline/get-models"
    
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
    dag_id='check_create_model_content_base',
    default_args=default_args,
    schedule_interval = '@daily',
    catchup=False
) as dag:
    
    check_task = BranchPythonOperator(
        task_id='check_db_is_changed',
        python_callable=check_db_is_changed
    )


    create_model_task = PythonOperator(
        task_id='create_model',
        python_callable=create_model
    )

    skip_create_model_task = DummyOperator(
        task_id='skip_create_model'
    )

    task_saving_model = PythonOperator(
        task_id='saving_model',
        python_callable=save_model,
        trigger_rule='none_failed_or_skipped'
    )

    task_send_message = PythonOperator(
        task_id='send_message',
        python_callable=send_message,
        trigger_rule='none_failed_or_skipped'
    )



    # trigger_process_train_content_base = TriggerDagRunOperator(
    #     task_id='trigger_training_content_base',
    #     trigger_dag_id='train_content_base',
    #     trigger_rule='none_failed_or_skipped'
    # )


    check_task >> [create_model_task, skip_create_model_task] >> task_saving_model >> task_send_message
    
   
    


