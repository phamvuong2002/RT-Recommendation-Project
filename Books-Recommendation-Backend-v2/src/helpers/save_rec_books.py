
from sqlalchemy import create_engine, text, select, MetaData, desc
from src.helpers.remove_duplicate import remove_duplicate_items
import redis
import json
from decimal import Decimal
import os

async def save_rec_books(books: list = [], user_id: str = "", model_type: str = "rating", key: str = "bookID"):
    mysql_host = os.environ.get("BACKEND_MYSQL_HOST")
    mysql_username = os.environ.get("BACKEND_MYSQL_USERNAME")
    mysql_pass = os.environ.get("BACKEND_MYSQL_PASS")
    mysql_dbname = os.environ.get("BACKEND_MYSQL_DBNAME")

    
    # Xử lý mảng đầu vào
    books = remove_duplicate_items(books, key)

    # Kết nối mysql
    # db_connection_str = 'mysql+pymysql://bookada:bookada2002@bookada.cfmwusg6itst.ap-southeast-1.rds.amazonaws.com/books_db_v1'
    # db_connection_str = 'mysql+pymysql://root:vuong@localhost/books_db_v1'
    db_connection_str = f"mysql+pymysql://{mysql_username}:{mysql_pass}@{mysql_host}/{mysql_dbname}"
    db_connection = create_engine(db_connection_str)

    # Khởi tạo metadata
    metadata = MetaData()
    metadata.reflect(bind=db_connection)

    # Object để truy vấn
    book_table = metadata.tables['book']
    rec_model = metadata.tables['rec_model']
    rec_session = metadata.tables['rec_session']
    rec_book = metadata.tables['rec_book']

    rec_books = []
    connection = db_connection.connect()
    with connection.begin() as transaction:
        #Tìm model mới nhất
        query = select(text('rec_model_id')).where(rec_model.c.rec_model_type == model_type).order_by(desc(rec_model.c.create_time)).limit(1)
        result = connection.execute(query)
        result = result.fetchone()
        rec_model_id = result[0]
        #Tạo session
        result = connection.execute(rec_session.insert().values(
            rec_model_id = rec_model_id
        ))
        last_inserted_id = result.lastrowid

        #Lưu thông tin sách
        for book in books:
            #tìm thông tin sách
            bookId = int(book[key])
            query = select(text('book_id'), text('book_title'), text('book_spe_price'), text('book_old_price'), text('book_img'), text('book_status'), text('book_categories')).where(book_table.c.book_id == bookId)
            result = connection.execute(query)
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
                    connection.execute(rec_book.insert().values(
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
                    insert_books_to_sorted_set(user_id=user_id, rec_session_id=last_inserted_id, book_info=book_data)
            else:
                print("Không tìm thấy thông tin cho sách với bookID", str(bookId))
    
        transaction.commit()
    connection.close()

    return rec_books

def insert_books_to_sorted_set(user_id, rec_session_id, book_info):
    redis_result_host = os.environ.get("BACKEND_REDIS_REC_RESULTS_HOST")
    redis_result_port = os.environ.get("BACKEND_REDIS_REC_RESULTS_PORT")
    redis_result_pass = os.environ.get("BACKEND_REDIS_REC_RESULTS_PASS")

    # Kết nối đến Redis
    # r = redis.Redis(host='redis-14987.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com', port=14987, password="SsgwktV1sE5C4chZ6NwvfsskYRsjdZbb")
    r = redis.Redis(host=redis_result_host, port=redis_result_port, password=redis_result_pass)

    # Chuyển đổi thông tin sách thành chuỗi JSON
    book_json = json.dumps(book_info, default=decimal_default)

    # Chèn thông tin sách vào sorted set với key là user_id
    # và score là rec_session_id
    r.zadd(user_id, {book_json: rec_session_id})


def insert_books_to_sorted_set_v2(user_id, rec_session_id, book_info):

    redis_result_host = os.environ.get("BACKEND_REDIS_REC_RESULTS_HOST")
    redis_result_port = os.environ.get("BACKEND_REDIS_REC_RESULTS_PORT")
    redis_result_pass = os.environ.get("BACKEND_REDIS_REC_RESULTS_PASS")

    # Kết nối đến Redis
    # r = redis.Redis(host='redis-14987.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com', port=14987, password="SsgwktV1sE5C4chZ6NwvfsskYRsjdZbb")
    r = redis.Redis(host=redis_result_host, port=redis_result_port, password=redis_result_pass)

    # Tạo một pipeline
    pipe = r.pipeline()

    # Thêm các lệnh ghi dữ liệu vào pipeline
    for book in book_info:
        book_json = json.dumps(book, default=decimal_default)
        pipe.zadd(user_id, {book_json: rec_session_id})

    # Thực thi pipeline
    pipe.execute()

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError