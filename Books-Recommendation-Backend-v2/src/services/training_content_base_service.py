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

async def train_content_base_model():
    mysql_host = os.environ.get("BACKEND_MYSQL_HOST")
    mysql_username = os.environ.get("BACKEND_MYSQL_USERNAME")
    mysql_pass = os.environ.get("BACKEND_MYSQL_PASS")
    mysql_dbname = os.environ.get("BACKEND_MYSQL_DBNAME")

    # Kết nối đến cơ sở dữ liệu
    # db_connection_str = 'mysql+pymysql://root:vuong@localhost/books_db_v1'
    # db_connection_str = "mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1"
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    # print("db_connection_str: ", db_connection_str)
    db_connection = create_engine(db_connection_str)
    connection = db_connection.connect()
    # Đọc dữ liệu từ MySQL và lưu vào DataFrame
    books_query = """SELECT 
                        book_id, book_title, book_categories, cate1_name, cate2_name, cate3_name, cate4_name
                      FROM 
                          book 
                      LEFT JOIN 
                          category_1 ON category_1.cate1_id = JSON_UNQUOTE(JSON_EXTRACT(book.book_categories, '$[0]'))
                      LEFT JOIN 
                          category_2 ON category_2.cate2_id = JSON_UNQUOTE(JSON_EXTRACT(book.book_categories, '$[1]'))
                      LEFT JOIN 
                          category_3 ON category_3.cate3_id = JSON_UNQUOTE(JSON_EXTRACT(book.book_categories, '$[2]'))
                      LEFT JOIN 
                          category_4 ON category_4.cate4_id = JSON_UNQUOTE(JSON_EXTRACT(book.book_categories, '$[3]'));"""
    
    # with db_engine.connect() as db_connection:
        # books_df = pd.read_sql(books_query, con=db_connection)
    books_df = pd.read_sql(books_query, con=db_connection)
    
    # Gom các cột cate lại thành 1 cột duy nhất
    # books_df['genres'] = books_df.apply(lambda row: ', '.join([row['cate1_name'], row['cate2_name'], row['cate3_name'], row['cate4_name']]), axis=1)
    books_df['genres'] = books_df.apply(lambda row: ', '.join(filter(None, [row['cate1_name'], row['cate2_name'], row['cate3_name'], row['cate4_name']])), axis=1)

    # print("books_df", books_df)
    # Loại bỏ các cột
    books_df.drop(['book_categories','cate1_name', 'cate2_name', 'cate3_name', 'cate4_name'], axis=1, inplace=True)
    
    # ## 3.SAVE MODEL INFO
    # Lưu thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "content"
    # lưu thông tin vào db
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
      # Tạo đối tượng Connection từ Engine
    result = connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.commit()
    connection.close()


    # ## 4. SAVING THE MODEL ###############################
    # backup current model 
    move_files('src/models/current/content', 'src/models/old/content')

    # content-base model
    books_df.drop_duplicates('book_id')
    pickle.dump(books_df,open('src/models/current/content/books_df.pkl','wb'))
    
    print("Content base model trained successfully!!!")
    return str(model_id)

    

