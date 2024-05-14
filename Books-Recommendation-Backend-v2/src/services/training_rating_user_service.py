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


POPULAR_RANGE = 2
COLLAB_RANGE = 0
k=1

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
 
    # Đọc dữ liệu từ MySQL và lưu vào DataFrame
    books_query = "SELECT feedback_userid AS `User-ID`, book_id AS `Book-ID`, feedback_rating AS `Book-Rating`, book_title AS `Book-Title`, book_authors AS `Book-Author`, book_publisherId as Publisher FROM book join feedback on book_id = feedback_bookid"
    # Thực thi query và lấy dữ liệu vào DataFrame
    books_df = pd.read_sql(books_query, con=db_connection)

    # print(books_df.shape)
    ### ## 0. DATA CLEANING ###############################
    # Chuyển đổi kiểu dữ liệu của cột "Book-Rating" sang số
    books_df['Book-Rating'] = books_df['Book-Rating'].astype(int)
    books_df['User-ID'] = books_df['User-ID'].astype("category")
    books_df['Book-ID'] = books_df['Book-ID'].astype("category")
    books_df['User_ID'] = books_df['User-ID'].cat.codes
    books_df['Book_ID'] = books_df['Book-ID'].cat.codes
   
    # print(books_df.sort_values(['User_ID','Book_ID']))
    # User-based: User-Item matrix (row: user, col: item)

    pivot_table = books_df.pivot_table(index='User_ID',columns='Book_ID',values='Book-Rating')
    pivot_table.fillna(0,inplace=True)
    # print(pivot_table)
    
    #chuẩn hóa dữ liệu
    normalize_data=pivot_table.subtract(pivot_table.mean(axis=1),axis=0)
    # print(normalize_data)
    similarity_scores = cosine_similarity(normalize_data)
    
    # ## 3.SAVE MODEL INFO
    # Lưu thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "rating"
    # lưu thông tin vào db
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    result = connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.commit()
    connection.close()


    # ## 4. SAVING THE MODEL ###############################
    # backup current model 
    move_files('src/models/current/rating-user', 'src/models/old/rating-user')

    # # # collaborative model
    books_df.drop_duplicates('Book-ID')
    # pickle.dump(U,open('src/models/current/rating-user/rating_user_factors.pkl','wb'))
    # pickle.dump(VT.T,open('src/models/current/rating-user/rating_item_factors.pkl','wb'))
    # pickle.dump(books_df,open('src/models/current/rating-user/books_df.pkl','wb'))
    pickle.dump(normalize_data,open('src/models/current/rating-user/pivot_table.pkl','wb'))
    pickle.dump(similarity_scores,open('src/models/current/rating-user/similarity_scores.pkl','wb'))
    pickle.dump(books_df,open('src/models/current/rating-user/books_df.pkl','wb'))
    print("Rating model trained successfully!!!")
    return str(model_id)
