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

async def train_rating_item_model():
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

    ### ## 0. DATA CLEANING ###############################
    # Chuyển đổi kiểu dữ liệu của cột "Book-Rating" sang số
    books_df['Book-Rating'] = books_df['Book-Rating'].astype(int)
    # Loại bỏ các giá trị không hợp lệ (như NaN) sau khi chuyển đổi kiểu dữ liệu
    books_df.dropna(subset=['Book-Rating'], inplace=True)

    num_rating_df = books_df.groupby('Book-ID').count()['Book-Rating'].reset_index()
    num_rating_df.rename(columns={'Book-Rating':'num_ratings'},inplace=True)
    # print(num_rating_df)

    avg_rating_df = (
        books_df.groupby("Book-ID")["Book-Rating"].mean().reset_index()
    )
    avg_rating_df.rename(columns={"Book-Rating": "avg_rating"}, inplace=True)
    # print(avg_rating_df)

    ### ## 1. POPULAR ITEMS ###############################
    popular_df = num_rating_df.merge(avg_rating_df, on="Book-ID")
    # print(popular_df)
    popular_df = popular_df[popular_df['num_ratings']>=POPULAR_RANGE].sort_values('avg_rating',ascending=False).head(50)
    # print(popular_df)

    ### ## 2. COLLABORATIVE FILTERING ITEMS ###############
    x = books_df.groupby('User-ID').count()['Book-Rating'] > COLLAB_RANGE
    engaged_users = x[x].index
    filtered_ratings = books_df[books_df['User-ID'].isin(engaged_users)]
    y = filtered_ratings.groupby('Book-ID').count()['Book-Rating'] > COLLAB_RANGE
    famous_books = y[y].index
    final_ratings = filtered_ratings[filtered_ratings['Book-ID'].isin(famous_books)]
    pivot_table = final_ratings.pivot_table(index='Book-ID',columns='User-ID',values='Book-Rating')
    pivot_table.fillna(0,inplace=True)
    # print(pivot_table)
    similarity_scores = cosine_similarity(pivot_table)

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
    move_files('src/models/current/rating', 'src/models/old/rating')

    # popularity model
    pickle.dump(popular_df,open('src/models/current/rating/popular.pkl','wb'))

    # # # collaborative model
    books_df.drop_duplicates('Book-ID')
    pickle.dump(pivot_table,open('src/models/current/rating/pivot_table.pkl','wb'))
    pickle.dump(similarity_scores,open('src/models/current/rating/similarity_scores.pkl','wb'))
    pickle.dump(books_df,open('src/models/current/rating/books_df.pkl','wb'))

    print("Rating model trained successfully!!!")
    return str(model_id)
