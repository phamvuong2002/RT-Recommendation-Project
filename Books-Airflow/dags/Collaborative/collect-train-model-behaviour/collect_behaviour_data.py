from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from datetime import timedelta, datetime
import redis
from sqlalchemy import create_engine, text, select, MetaData, desc
import json
import logging

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 5, 13),
    'email': ['bookadahcmus@gmail.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=2)
}

def get_behaviours_from_redis() :
    r = redis.Redis(host='redis-16048.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com', port=16048, password="a0JcKZ8pfS8Y7oMMO6MgUjJwbjry4KXN")
    keys = r.keys('*')
    # Tạo một mảng để lưu trữ dữ liệu
    data_array = []
    # Lặp qua các keys và lấy dữ liệu tương ứng
    for key in keys:
        cleaned_key = key.decode('utf-8')
        data = json.loads(r.get(key))
        # Kiểm tra sự tồn tại của các key trước khi thêm vào data_array
        if all(k in data for k in ('userId', 'behaviour', 'productId')):
            data_array.append({
                'key': str(cleaned_key),
                'userId': data['userId'],
                'behaviour': data['behaviour'],
                'productId': data['productId']
            })
        else:
            missing_keys = [k for k in ('userId', 'behaviour', 'productId') if k not in data]
            logging.error(f"Key(s) {missing_keys} missing in data from Redis key: {cleaned_key}")
    return data_array

def save_behaviours_to_mysql(ti) :
    data_behaviours=ti.xcom_pull(task_ids='get_behavior_data')
    # db_connection_str = f"mysql+pymysql://root:vuong@127.0.0.1/books_db_v1"
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada.cfmwusg6itst.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    # Khởi tạo metadata
    metadata = MetaData()
    metadata.reflect(bind=db_connection)
    user_behaviour = metadata.tables['user_behaviour']
    try:
        with db_connection.connect() as conn:
            #Lưu thông tin behaiours
            for behaviour in data_behaviours:
                conn.execute(user_behaviour.insert().values(
                    ub_sid = behaviour['key'],
                    ub_user_id = behaviour['userId'],
                    ub_behaviour_type = behaviour['behaviour'],
                    ub_product_id = behaviour['productId'],
                ))
            conn.commit()
    except Exception as e:
        return f'ETL Failed: {e}'
    return 'ETL successfully'

with DAG(
    dag_id='collect_behaviour_data',
    default_args=default_args,
    schedule_interval = '@daily',
    catchup=False
) as dag:
    task_get_behavior_data = PythonOperator(
        task_id='get_behavior_data',
        # bash_command='echo Hello World!!! This is first task'
        python_callable=get_behaviours_from_redis
    )

    task_save_behavior_data = PythonOperator(
        task_id='save_behavior_data',
        python_callable=save_behaviours_to_mysql
    )
    
    trigger_process_behaviour = TriggerDagRunOperator(
        task_id='trigger_training_behaviour_model',
        trigger_dag_id='training_behaviour_model'
    )
    
    task_get_behavior_data >> task_save_behavior_data >> trigger_process_behaviour
