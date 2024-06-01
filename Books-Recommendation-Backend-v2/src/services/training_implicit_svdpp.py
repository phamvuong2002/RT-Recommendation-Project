import redis
import pandas as pd
from sqlalchemy import create_engine, insert
from sqlalchemy import text
import pickle
import time
from src.helpers.move_files import move_files
import os
from surprise import Dataset, SVD, Reader
from surprise import SVDpp, accuracy
from surprise.model_selection import GridSearchCV, train_test_split



async def train_implicit_model_SVDpp():
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

    print(grouped_df.sort_values('contentId'))
    #tạo từ điển

    # matrix_val=grouped_df.pivot_table(index='person_id',values='eventStrength', columns='content_id')
    # matrix=matrix_val.values
    # u,s,vt=svd(matrix)
    max_eventStrength=max(grouped_df['eventStrength'].values)
    reader = Reader(rating_scale=(0, max_eventStrength))
    # data = Dataset.load_from_df(df_new[['person_id', 'content_id', 'eventStrength']], reader)
    data = Dataset.load_from_df(grouped_df[['personId', 'contentId', 'eventStrength']], reader)


    # trainset, testset = train_test_split(data, test_size=0.2)  
    algo_pp=SVDpp()
    algo_pp.fit(data.build_full_trainset())
    # algo_pp_test=SVDpp()
    # algo_pp_test.fit(trainset)
    # predictions_pp = algo_pp.fit(trainset).test(testset)
    # df_ = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
    # print(df_.loc[df_['uid']=='664efb0dc37d38effd9eb59b'])

    # algo_pp.fit(trainset)

    # Lưu thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "behaviour_svd"

    # lưu thông tin vào db
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"

    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    result = connection.execute(text(insert_query))  # Thực hiện truy vấn

    # connection.commit()
    connection.close()

    #backup model hiện tại
    move_files('src/models/current/behaviour-svd', 'src/models/old/behaviour-svd')

    # save model
    with open('src/models/current/behaviour-svd/grouped_df.pkl', 'wb') as f:
        pickle.dump(grouped_df, f)

    with open('src/models/current/behaviour-svd/algo_pp.pkl', 'wb') as f:
        pickle.dump(algo_pp, f)


    print("Implicit model trained successfully!!!")
    return str(model_id)
