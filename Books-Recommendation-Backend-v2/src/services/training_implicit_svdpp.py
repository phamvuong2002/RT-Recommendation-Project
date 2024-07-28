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
from sklearn.preprocessing import MinMaxScaler
import math

def smooth_user_preference(x):
    return math.log(1+x, 2)


async def get_data_from_MySQL():
    mysql_host = os.environ.get("BACKEND_MYSQL_HOST")
    mysql_username = os.environ.get("BACKEND_MYSQL_USERNAME")
    mysql_pass = os.environ.get("BACKEND_MYSQL_PASS")
    mysql_dbname = os.environ.get("BACKEND_MYSQL_DBNAME")

    # Kết nối đến cơ sở dữ liệu
    # db_connection_str = 'mysql+pymysql://root:vuong@localhost/books_db_v1'
    # db_connection_str = "mysql+pymysql://bookada:bookada2002@bookada.cfmwusg6itst.ap-southeast-1.rds.amazonaws.com/books_db_v1"
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    db_connection = create_engine(db_connection_str)
    
    # Dữ liệu được lấy có Create_time trong 3 ngày gần nhất
    books_query = """ SELECT DISTINCT ub_sid as behaviour_id, ub_user_id as personId, ub_behaviour_type as eventType, ub_product_id as contentId FROM user_behaviour  WHERE ub_sid IS NOT NULL AND ub_sid <> '' AND ub_user_id IS NOT NULL AND ub_user_id <> '' AND ub_behaviour_type IS NOT NULL AND ub_behaviour_type <> ''AND ub_product_id IS NOT NULL AND ub_product_id <> '' AND datediff(curtime(), create_time) < 3"""
    with db_connection.connect() as conn:
        books_df = pd.read_sql(
            sql=books_query,
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
    
    books_df['eventStrength'] = books_df['eventType'].apply(lambda x: SCORE[x])
    grouped_df = books_df.groupby(['personId', 'contentId'])['eventStrength'].sum().reset_index()  
    # Trả về 3 cột cần thiết
    final_grouped_df=grouped_df[['personId','contentId','eventStrength']]
    return final_grouped_df
    


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
    # db_connection_str = "mysql+pymysql://bookada:bookada2002@bookada.cfmwusg6itst.ap-southeast-1.rds.amazonaws.com/books_db_v1"
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    db_connection = create_engine(db_connection_str)

    r = redis.Redis(host=redis_vector_host, port=redis_vector_port, password=redis_vector_pass)
    # Key của sorted set trong Redis
    sorted_set_key = 'vector-score'
  
    # Train toàn bộ 
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
    grouped_df = pd.DataFrame(rows, columns=['personId', 'contentId', 'eventStrength'])
    # grouped_df = df.groupby(['personId', 'contentId']).sum().reset_index()
    
    final_grouped_df=grouped_df
    #Nếu vector-score có len < 300 --> gọi thêm từ Mysql 
    if(len(rows)<300):
        mysql_grouped_df=await get_data_from_MySQL()
        
        #Gộp 2 data frame lại 
        concate_df=pd.concat([grouped_df,mysql_grouped_df]).reset_index()

        #Chuyển đổi kiểu dữ liệu về String
        concate_df['personId']=concate_df['personId'].astype(str)
        concate_df['contentId']=concate_df['contentId'].astype(str)

        # Group by [personId, contentId] --> Tính tổng điểm
        # final_grouped_df = concate_df.groupby(['personId', 'contentId'])['eventStrength'].sum().reset_index()

        # Sum eventStrength and apply a log transformation to smooth the distribution.
        final_grouped_df = concate_df.groupby(['personId', 'contentId'])['eventStrength'].sum().apply(smooth_user_preference).reset_index()
    else:
        final_grouped_df['personId']=final_grouped_df['personId'].astype(str)
        final_grouped_df['contentId']=final_grouped_df['contentId'].astype(str)
        final_grouped_df = grouped_df.groupby(['personId', 'contentId'])['eventStrength'].sum().apply(smooth_user_preference).reset_index()

    min_r=final_grouped_df['eventStrength'].min()
    max_r=final_grouped_df['eventStrength'].max()
    # Scale điểm min_r, max_r sau khi đã biến đổi rating
    reader=Reader(rating_scale=(min_r, max_r))
    data_scale_max= Dataset.load_from_df(final_grouped_df[['personId', 'contentId', 'eventStrength']], reader)

    trainset=data_scale_max.build_full_trainset()
    
    param_grid = {"n_epochs": [5, 10], "lr_all": [0.001, 0.008], "reg_all": [0.4, 0.6]}
    gs = GridSearchCV(SVDpp, param_grid, measures=["rmse", "mae"], cv=3)
    gs.fit(data_scale_max)
    algo_pp=gs.best_estimator['rmse']
    algo_pp.fit(trainset)

    # Train 80% 
    # trainset, testset = train_test_split(data, test_size=0.2)  
    # algo_pp=SVDpp()
    # algo_pp.fit(trainset)


    # Lưu thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "behaviour_svd"

    # lưu thông tin vào db
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"

    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    with connection.begin() as transaction:
        connection.execute(text(insert_query))
        transaction.commit()
    # result = connection.execute(text(insert_query))  # Thực hiện truy vấn
    # connection.commit()
    connection.close()

    #backup model hiện tại
    move_files('src/models/current/behaviour-svd', 'src/models/old/behaviour-svd')

    # save model
    with open('src/models/current/behaviour-svd/grouped_df.pkl', 'wb') as f:
        pickle.dump(final_grouped_df, f)

    with open('src/models/current/behaviour-svd/algo_pp.pkl', 'wb') as f:
        pickle.dump(algo_pp, f)


    print("Implicit model trained successfully!!!")
    return str(model_id)

