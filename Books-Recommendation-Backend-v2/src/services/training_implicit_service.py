import redis
import scipy.sparse as sparse
import numpy as np
import pandas as pd
from sqlalchemy import create_engine, insert
from sqlalchemy import text
import pickle
import implicit
import time
from src.helpers.move_files import move_files
import os

async def train_implicit_model():
    mysql_host = os.environ.get("BACKEND_MYSQL_HOST")
    mysql_username = os.environ.get("BACKEND_MYSQL_USERNAME")
    mysql_pass = os.environ.get("BACKEND_MYSQL_PASS")
    mysql_dbname = os.environ.get("BACKEND_MYSQL_DBNAME")

    redis_vector_host = os.environ.get("BACKEND_REDIS_VECTOR_REC_HOST")
    redis_vector_port = os.environ.get("BACKEND_REDIS_VECTOR_REC_PORT")
    redis_vector_pass = os.environ.get("BACKEND_REDIS_VECTOR_REC_PASS")

    # Kết nối mysql
    # db_connection_str = 'mysql+pymysql://root:vuong@localhost/books_db_v1'
    # db_connection_str = "mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1"
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    db_connection = create_engine(db_connection_str)

    # Kết nối đến Redis
    # r = redis.Redis(host='redis-18188.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com', port=18188, password="BPCJVK6TcHKjsliR97SBnFp3BtsZcGWB")
    r = redis.Redis(host=redis_vector_host, port=redis_vector_port, password=redis_vector_pass)
    # Key của sorted set trong Redis
    sorted_set_key = 'vector-score'

    # Lấy dữ liệu từ sorted set
    sorted_set_data = r.zrange(sorted_set_key, 0, -1, withscores=True)

    # Khởi tạo danh sách các dòng để tạo DataFrame
    rows = []
    for item in sorted_set_data:
         # Decode byte string và phân tách person_id và content_id
        person_content_id_str, eventStrength = item
        person_content_id_str = person_content_id_str.decode('utf-8')
        personId, contentId = person_content_id_str.split(':')

        # Thêm dòng mới vào danh sách
        rows.append((personId, contentId, float(eventStrength)))


    # Tạo DataFrame từ danh sách các dòng
    df = pd.DataFrame(rows, columns=['personId', 'contentId', 'eventStrength'])
    grouped_df = df.groupby(['personId', 'contentId']).sum().reset_index()

    grouped_df['personId'] = grouped_df['personId'].astype("category")
    grouped_df['contentId'] = grouped_df['contentId'].astype("category")
    grouped_df['person_id'] = grouped_df['personId'].cat.codes
    grouped_df['content_id'] = grouped_df['contentId'].cat.codes

    #tạo từ điển
    sparse_content_person = sparse.csr_matrix((grouped_df['eventStrength'].astype(float), (grouped_df['content_id'], grouped_df['person_id'])))
    sparse_person_content = sparse.csr_matrix((grouped_df['eventStrength'].astype(float), (grouped_df['person_id'], grouped_df['content_id'])))

    #cài đặt mô hình
    model = implicit.als.AlternatingLeastSquares(factors=20, regularization=0.1, iterations=50)
    alpha = 15
    data = (sparse_person_content * alpha).astype('double')

    # Fit the model
    model.fit(data)

    # Lưu thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "behaviour"

    # lưu thông tin vào db
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    result = connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.commit()
    connection.close()

    #backup model hiện tại
    move_files('src/models/current/behaviour', 'src/models/old/behaviour')

    # save model
    with open('src/models/current/behaviour/implicit_model.pkl', 'wb') as f:
        pickle.dump(model, f)

    with open('src/models/current/behaviour/grouped_df.pkl', 'wb') as f:
        pickle.dump(grouped_df, f)

    print("Implicit model trained successfully!!!")
    return str(model_id)
