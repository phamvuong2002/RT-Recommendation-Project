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
from numpy.linalg import svd
from surprise import Dataset, SVD, Reader
from surprise import SVDpp, accuracy
from surprise.model_selection import GridSearchCV, train_test_split



async def train_rating_model_SVDpp():
    mysql_host = os.environ.get("BACKEND_MYSQL_HOST")
    mysql_username = os.environ.get("BACKEND_MYSQL_USERNAME")
    mysql_pass = os.environ.get("BACKEND_MYSQL_PASS")
    mysql_dbname = os.environ.get("BACKEND_MYSQL_DBNAME")

    # Kết nối mysql
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    db_connection = create_engine(db_connection_str)
    connection_=db_connection.raw_connection()
    books_query = ("SELECT u.user_sid AS `User-ID`, b.book_id AS `Book-ID`, fb.feedback_rating AS `Book-Rating`, b.book_title AS `Book-Title`, b.book_authors AS `Book-Author`, b.book_publisherId as Publisher FROM book b join feedback fb on b.book_id = fb.feedback_bookid join user u on u.user_id=fb.feedback_userid")

    books_df = pd.read_sql(books_query, con=connection_)

    reader = Reader(rating_scale=(0, 5))
    # data = Dataset.load_from_df(df_new[['person_id', 'content_id', 'eventStrength']], reader)
    data = Dataset.load_from_df(books_df[['User-ID', 'Book-ID', 'Book-Rating']], reader)

    algo_pp=SVDpp()
    algo_pp.fit(data.build_full_trainset())

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
    move_files('src/models/current/rating-svd', 'src/models/old/rating-svd')

    # save model
    with open('src/models/current/rating-svd/grouped_df.pkl', 'wb') as f:
        pickle.dump(books_df, f)

    with open('src/models/current/rating-svd/algo_pp.pkl', 'wb') as f:
        pickle.dump(algo_pp, f)


    print("Implicit model trained successfully!!!")
    return str(model_id)
