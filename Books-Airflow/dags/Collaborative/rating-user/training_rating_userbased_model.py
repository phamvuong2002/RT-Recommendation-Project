from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.operators.trigger_dagrun import TriggerDagRunOperator
from datetime import timedelta, datetime
import pandas as pd
from sqlalchemy import create_engine, text, select, MetaData, desc 
import scipy.sparse as sparse
import implicit
import pickle
import boto3
import time
import requests
from airflow import DAG
from datetime import timedelta, datetime
from surprise import Dataset, SVD, Reader
from surprise import SVDpp, accuracy
from surprise.model_selection import GridSearchCV   , train_test_split
from airflow.operators.python import PythonOperator
from sklearn.metrics.pairwise import cosine_similarity
from airflow.providers.redis.hooks.redis import RedisHook
import pandas as pd
import redis
import scipy.sparse as sparse
from surprise.prediction_algorithms.knns import KNNBasic
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 5, 13),
    'email': ['bookadahcmus@gmail.com'],
    'email_on_failure': True,
    'email_on_retry': True,
    'retries': 2,
    'retry_delay': timedelta(minutes=2)
}

def process_rating():
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    
    min_book_ratings = 5
    min_user_ratings = 5
    # Đọc tất cả dữ liệu từ bảng user_behaviour vào DataFrame
    query_all_feedback = """
        select  u.user_sid as `User-ID`,fb.feedback_bookid as `Book-ID`,avg(fb.feedback_rating-1) as `Book-Rating`
        from books_db_v1.feedback fb join books_db_v1.user u 
        on fb.feedback_userid=u.user_id
        group by u.user_sid, fb.feedback_userid, fb.feedback_bookid
    """

    with db_connection.connect() as conn:
        df = pd.read_sql(
            sql=query_all_feedback,
            con=conn.connection
        )

    df['Book-Rating'] = df['Book-Rating'].astype(float)

    filter_books = df['Book-ID'].value_counts() > min_book_ratings
    filter_books = filter_books[filter_books].index.tolist()


    filter_users = df['User-ID'].value_counts() > min_user_ratings
    filter_users = filter_users[filter_users].index.tolist()

    df_new = df[(df['Book-ID'].isin(filter_books)) & (df['User-ID'].isin(filter_users)) & (df['Book-Rating']>0)]
    return df_new   



def get_trained_user():
    #Lấy các user: có mua hàng trong 1 tháng gần nhất + Có đánh giá trên 5 sản phẩm trong 1 tháng gần nhất
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    
    # Đọc tất cả dữ liệu từ bảng user_behaviour vào DataFrame
    query_all_feedback = """
       select user_sid as `user_id` from books_db_v1.user where 
        user_id in(
        select distinct(feedback_userid) 
        from books_db_v1.feedback
        where feedback_rating>1 and (datediff(curtime(), create_time) <30 or datediff(curtime(), update_time) <30)
        group by feedback_userid
        having  count(*)>5 
        UNION
        select distinct(order_user_id)
        from books_db_v1.order
        where (datediff(curtime(), create_time) <30 or datediff(curtime(), update_time) <30))

    """
    
    with db_connection.connect() as conn:
        df = pd.read_sql(
            sql=query_all_feedback,
            con=conn.connection
        )
    user_list=df['user_id'].tolist()
    print(user_list)
    return user_list

def training_model(ti):
    grouped_df=ti.xcom_pull(task_ids='process_rating')
    # print(grouped_df)
    reader = Reader(rating_scale=(0, 5))
    data = Dataset.load_from_df(grouped_df[['User-ID','Book-ID', 'Book-Rating']], reader)
    param_grid = {'k': [10, 20, 30], 'min_k': [3, 6, 9],
              'sim_options': {'name': ['msd', 'cosine','pearson','pearson_baseline'],
                              'user_based': [True], 'min_support':[2,4]}
              }

    # Performing 3-fold cross validation to tune the hyperparameters
    gs = GridSearchCV(KNNBasic, param_grid, measures=['rmse'], cv=3, n_jobs=-1)
    
    n_similar=20
    # Fitting the data
    gs.fit(data)

    # Best RMSE score
    # print(gs.best_score['rmse'])
    # Combination of parameters that gave the best RMSE score
    # print(gs.best_params['rmse'])
    # algo_knn = gs.best_estimator["rmse"]    
    algo_knn = KNNBasic()  
    algo_knn.fit(data.build_full_trainset())
    trained_user=get_trained_user()
    # print('before')
    
    recommendation_lists=[]
    for i in range(len(trained_user)):
        user=trained_user[i]
        rated_book = grouped_df.loc[grouped_df['User-ID']==user,'Book-ID'].unique()

        list_of_unrated_book = grouped_df.loc[(grouped_df['User-ID']==user,['Book-ID']) and (~grouped_df['Book-ID'].isin(rated_book)),'Book-ID']
       
        # set up user set with unrated books
        # print('unrated ',list_of_unrated_book) 
        user_set = [[user, item_id,0] for item_id in list_of_unrated_book]
        # print('userset',user_set,0)
        # generate predictions based on user set
        predictions_pp= algo_knn.test(user_set)
        
        df = pd.DataFrame(predictions_pp, columns=['uid', 'iid', 'rui', 'est', 'details'])
        
        df=df.rename(columns={'uid':'user_id','iid': 'book_id', 'est': 'score'})
        top_n_recommendations = df[['user_id','book_id','score']].sort_values('score',ascending=False).drop_duplicates('book_id')[:n_similar]
       
    
        recommendation_lists.append(top_n_recommendations)

    # Chuyển đổi mô hình thành pickle
    rating_user_model_pickle = pickle.dumps(algo_knn)
    rating_user_grouped_df_pickle = pickle.dumps(grouped_df)
    # testset_pickle = pickle.dumps(testset)


    ti.xcom_push(key='rating_user_model_pickle', value=rating_user_model_pickle)
    ti.xcom_push(key='rating_user_grouped_df_pickle', value=rating_user_grouped_df_pickle)
    ti.xcom_push(key='rec_resul_rating_user', value=recommendation_lists)
    # return grouped_df



def save_user_recommendations_to_mysql(ti) :
    recommendation_lists=ti.xcom_pull(key='rec_resul_rating_user')
    # print('rec_pickle',rec_pickle)
    db_connection_str = f"mysql+pymysql://root:vuong@127.0.0.1/books_db_v1"
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    # Khởi tạo metadata
    metadata = MetaData()
    metadata.reflect(bind=db_connection)
      # Object để truy vấn
    book_table = metadata.tables['book']
    rec_model = metadata.tables['rec_model']
    rec_session = metadata.tables['rec_session']
    rec_book = metadata.tables['rec_book']
    model_type='rating_user'
    rec_books = []
    try:
        with db_connection.connect() as conn:
            #Tìm model mới nhất
            query = select(text('rec_model_id')).where(rec_model.c.rec_model_type == model_type).order_by(desc(rec_model.c.create_time)).limit(1)
            result = conn.execute(query)
            result = result.fetchone()
            rec_model_id = result[0]
            #Tạo session
            result = conn.execute(rec_session.insert().values(
                rec_model_id = rec_model_id
            ))
            last_inserted_id = result.lastrowid

            for i in range(len(recommendation_lists)):
                # print('IIIIII,',i)
                # rec_user_i=recommendation_lists[i]
                user_i=recommendation_lists[i]
                books=user_i['book_id']
                user=user_i['user_id'].unique()
                user_id=user[0]
            #Lưu thông tin sách
                for book in books:
                    #tìm thông tin sách
                    bookId = int(book)
                    query = select(text('book_id'), text('book_title'), text('book_spe_price'), text('book_old_price'), text('book_img'), text('book_status'), text('book_categories')).where(book_table.c.book_id == bookId)
                    result = conn.execute(query)
                    book_info = result.fetchone()
                    if book_info:
                        book_data = {
                            "bookId": book_info[0],
                            "bookTitle": book_info[1],
                            "bookSpePrice": book_info[2],
                            "bookOldPrice": book_info[3],
                            "bookImg": book_info[4],
                            "bookStatus": book_info[5],
                            "bookCategory": book_info[6]
                        }
                        #return recommended book data
                        rec_books.append(book_data)
                    
                        #xử lý thể loai
                        book_category_str = book_data['bookCategory']
                        book_category_str = book_category_str.strip('[]')
                        book_category_list = book_category_str.split(',')
                        book_category_list = [int(x) for x in book_category_list]

                        #lưu thông tin vừa tìm được vào bảng rec_book
                        if(book_data["bookStatus"] == 1):
                            #lưu vào mysql 
                            conn.execute(rec_book.insert().values(
                                rec_session_id = last_inserted_id,
                                rec_user_sid = user_id,
                                rec_book_id = book_data['bookId'],
                                rec_book_title = book_data['bookTitle'],
                                rec_book_img = book_data['bookImg'],
                                rec_book_spe_price = book_data['bookSpePrice'],
                                rec_book_old_price = book_data['bookOldPrice'],
                                rec_book_categories = book_category_list #book_data['bookCategory'] #book_data['bookCategory']
                            ))

                            #lưu vào redis
                            # insert_books_to_sorted_set(user_id=user_id, rec_session_id=last_inserted_id, book_info=book_data)
                    else:
                        print("Không tìm thấy thông tin cho sách với bookID", str(bookId))
                                    
            conn.commit()
    except Exception as e:
        return f'ETL Failed: {e}'
   
    return 'ETL successfully'

def save_model(ti):
    rating_user_model_pickle = ti.xcom_pull(key='rating_user_model_pickle')
    rating_user_grouped_df_pickle = ti.xcom_pull(key='rating_user_grouped_df_pickle')

    # Thông tin model
    model_id = f"model_{int(time.time())}"
    #model type: "content", "rating", "behaviour"
    model_type = "rating_user"

    # Upload the model file to S3
    s3 = boto3.client(
        's3',
        aws_access_key_id="AKIA3SH5ODCFFA4AA3JI",
        aws_secret_access_key="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",
        region_name="ap-southeast-1"
    )
    # Lưu tệp pickle lên S3
    bucket_name = 'bookada-saving-model-airflow'
    #model_pickle
    model_file_name = f'knn_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=model_file_name, Body=rating_user_model_pickle)
    #grouped_df_pickle
    grouped_df_file_name = f'grouped_df_{model_id}_{model_type}.pkl'
    s3.put_object(Bucket=bucket_name, Key=grouped_df_file_name, Body=rating_user_grouped_df_pickle)

    #Lưu Thông tin vào DB
    db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada-database-v1.crq4aco4chyf.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    db_connection = create_engine(db_connection_str)
    insert_query = f"INSERT INTO rec_model (rec_model_id, rec_model_type, create_time) VALUES ('{model_id}', '{model_type}', CURRENT_TIMESTAMP)"
    connection = db_connection.connect()  # Tạo đối tượng Connection từ Engine
    connection.execute(text(insert_query))  # Thực hiện truy vấn
    connection.close()

    #push file names on Xcom
    ti.xcom_push(key='rating_user_model_pickle_name', value=model_file_name)
    ti.xcom_push(key='rating_user_grouped_df_pickle_name', value=grouped_df_file_name)

    #Gọi gửi thông báo đến server python
    return "Training Successfully"

def send_message(ti):
    rating_user_model_pickle = ti.xcom_pull(key='rating_user_model_pickle_name')
    rating_user_grouped_df_pickle = ti.xcom_pull(key='rating_user_grouped_df_pickle_name')
    # predictions=ti.xcom_pull(key='predictions')
    file_names = []
    file_names.append(rating_user_model_pickle)
    file_names.append(rating_user_grouped_df_pickle)

    model_type = "rating_user"

     # Địa chỉ URL của API
    url = "http://192.168.1.34:4123/offline/get-models"
    
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
    dag_id='training_rating_userbased_model_02',
    default_args=default_args,
    schedule_interval=None,  # Không lên lịch tự động, chỉ kích hoạt thủ công
    catchup=False
) as dag:
    task_process_rating = PythonOperator(
        task_id='process_rating',
        python_callable=process_rating
    )

    task_training_model = PythonOperator(
        task_id='training_model',
        python_callable=training_model
    )

    task_save_recommendation_mysql = PythonOperator(
        task_id='save_rec_to_mysql',
        python_callable=save_user_recommendations_to_mysql
    )

  
    task_saving_model = PythonOperator(
        task_id='saving_model',
        python_callable=save_model
    )

    task_send_message = PythonOperator(
        task_id='send_message',
        python_callable=send_message
    )

    task_process_rating >> task_training_model >> task_saving_model >> task_save_recommendation_mysql >> task_send_message