import pandas as pd
from mysql.connector.pooling import MySQLConnectionPool
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics.pairwise import cosine_similarity
import pickle
from sqlalchemy import create_engine, text
import time
from src.helpers.move_files import move_files
import os
from sklearn.neighbors import NearestNeighbors
import scipy.sparse as sparse
from surprise import KNNBasic
from surprise import Dataset, SVD, Reader
from surprise.model_selection import GridSearchCV, train_test_split, cross_validate
POPULAR_RANGE = 2
COLLAB_RANGE = 0
k=1
neighbors=5


async def train_rating_user_model():
    mysql_host = os.environ.get("BACKEND_MYSQL_HOST")
    mysql_username = os.environ.get("BACKEND_MYSQL_USERNAME")
    mysql_pass = os.environ.get("BACKEND_MYSQL_PASS")
    mysql_dbname = os.environ.get("BACKEND_MYSQL_DBNAME")
 
    # Kết nối đến cơ sở dữ liệu 
    # db_connection_str = 'mysql+pymysql://root:vuong@localhost/books_db_v1'
    # db_connection_str = "mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1"
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    db_connection = create_engine(db_connection_str)
    # db_connection.connect()
    # print(db_connection)
    
    # Đọc dữ liệu từ MySQL và lưu vào DataFrame
    books_query = ("SELECT u.user_sid AS `User-ID`, b.book_id AS `Book-ID`, fb.feedback_rating AS `Book-Rating`, b.book_title AS `Book-Title`, b.book_authors AS `Book-Author`, b.book_publisherId as Publisher FROM book b join feedback fb on b.book_id = fb.feedback_bookid join user u on u.user_id=fb.feedback_userid")
    # # Thực thi query và lấy dữ liệu vào DataFrame
    # books_df = pd.read_sql(books_query, db_connection)
    books_df = pd.read_sql(books_query, con=db_connection.raw_connection())

    ### ## 0. DATA CLEANING ###############################
    # Chuyển đổi kiểu dữ liệu của cột "Book-Rating" sang số
    books_df['Book-Rating'] = books_df['Book-Rating'].astype(int)
    books_df['User-ID'] = books_df['User-ID'].astype("category")
    books_df['Book-ID'] = books_df['Book-ID'].astype("category")
    books_df['User_ID'] = books_df['User-ID'].cat.codes
    books_df['Book_ID'] = books_df['Book-ID'].cat.codes


    pivot_table = books_df.pivot_table(index='User_ID',columns='Book_ID',values='Book-Rating')
    
    normalize_data=pivot_table.subtract(pivot_table.mean(axis=1),axis='rows')
    # # print(normalize_data)
    similarity_scores = cosine_similarity(normalize_data.fillna(0))
    mean = books_df.groupby(by='User_ID', as_index=False)['Book-Rating'].mean()
    # ## 3.SAVE MODEL INFO
    # Lưu thông tin model
    model_id = f"model_{int(time.time())}" 
    #model type: "content", "rating", "behaviour"
    model_type = "rating_user"
    # lưu thông tin vào db
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"

    # with db_connection.connect() as conn:
    #     books_df = pd.read_sql(
    #     sql=books_query, 
    #     con=conn.connection)
     # connection.close()


    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    with connection.begin() as transaction:
        connection.execute(text(insert_query))
        transaction.commit()
    # result = connection.execute(text(insert_query))  # Thực hiện truy vấn
    # connection.commit()
    connection.close()


    # ## 4. SAVING THE MODEL ###############################
    # backup current model 
    move_files('src/models/current/rating-user', 'src/models/old/rating-user')

    # # # collaborative model
    pickle.dump(normalize_data,open('src/models/current/rating-user/pivot_table.pkl','wb'))
    pickle.dump(similarity_scores,open('src/models/current/rating-user/similarity_scores.pkl','wb'))
    pickle.dump(books_df,open('src/models/current/rating-user/books_df.pkl','wb'))
    pickle.dump(mean,open('src/models/current/rating-user/mean_rating.pkl','wb'))
    print("Rating model trained successfully!!!")
    return str(model_id)
