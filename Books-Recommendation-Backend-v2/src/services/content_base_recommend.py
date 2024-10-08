import pandas as pd
import numpy as np
from src.helpers.load_model import load_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import faiss
import unicodedata
import os
import redis
import time
import regex as re 
from datetime import datetime, timedelta
from pyvi import ViTokenizer, ViUtils

def normalize_text(text):
    # Thay thế dấu gạch ngang bằng khoảng trắng
    text = text.replace('-', ' ')
    # Loại bỏ các ký tự không mong muốn
    text = re.sub(r'[^\w\s-]', '', text)
    # Loại bỏ dấu tiếng Việt và chuyển về chữ thường
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('utf-8')
    return text.lower()

def split_keywords(title, add_unwanted_words = True):
    # Các từ không mong muốn
    unwanted_words = ["truyen", "sach"]

    title = title.replace(',', ' ')
    title = title.replace('-', ' ')

    # Nhận diện và giữ nguyên các từ có dạng "tập <số>"
    tap_pattern = re.compile(r'\btập \d+\b', re.IGNORECASE)
    matches = tap_pattern.findall(title)

    # Loại bỏ các từ "tập <số>" đã nhận diện khỏi tiêu đề gốc
    for match in matches:
        title = title.replace(match, "")

    # Tách tiêu đề thành các từ khóa nhỏ hơn
    words = title.split()
    normalized_words = [normalize_text(word) if not word.isdigit() else r'\b' + re.escape(str(word)) + r'\b' for word in words]
    # normalized_words = [normalize_text(word) for word in words]
    # normalized_words = [normalize_text(word) if not word.isdigit() else str(word) for word in words]
    
    # Thêm các từ "tập <số>" đã nhận diện vào danh sách từ khóa
    normalized_words.extend([normalize_text(match) for match in matches])

    # Nếu từ đầu tiên là từ không mong muốn, loại bỏ nó
    if(add_unwanted_words):
        if normalized_words and normalized_words[0] in unwanted_words:
            normalized_words = normalized_words[1:]

    return normalized_words

# Lấy các biến môi trường để kết nối Redis
redis_vector_host = os.environ.get("BACKEND_REDIS_VECTOR_REC_HOST")
redis_vector_port = os.environ.get("BACKEND_REDIS_VECTOR_REC_PORT")
redis_vector_pass = os.environ.get("BACKEND_REDIS_VECTOR_REC_PASS")

# Khởi tạo Redis client
r = redis.Redis(host=redis_vector_host, port=redis_vector_port, password=redis_vector_pass)

def create_redis_model_v1():
    # # Tách tiêu đề thành các từ khóa nhỏ hơn
    # redis_vector_host = os.environ.get("BACKEND_REDIS_VECTOR_REC_HOST")
    # redis_vector_port = os.environ.get("BACKEND_REDIS_VECTOR_REC_PORT")
    # redis_vector_pass = os.environ.get("BACKEND_REDIS_VECTOR_REC_PASS")

    # r = redis.Redis(host=redis_vector_host, port=redis_vector_port, password=redis_vector_pass)
    # Key của sorted set trong Redis
    sorted_set_key = 'vector-score'

    # Lấy dữ liệu từ sorted set
    sorted_set_data = r.zrange(sorted_set_key, 0, -1, withscores=True)

    # Khởi tạo danh sách các dòng để tạo DataFrame
    redis_model = []
    for item in sorted_set_data:
         # Decode byte string và phân tách person_id và content_id
        vecto, eventStrength = item
        vecto = vecto.decode('utf-8')
        r_userId, bookId = vecto.split(':')
        redis_model.append((r_userId, bookId))
    
    track_book_user = pd.DataFrame(redis_model, columns=['userId', 'bookId'])
    return track_book_user

def create_redis_model(userId, n):
    # # Lấy các biến môi trường để kết nối Redis
    # redis_vector_host = os.environ.get("BACKEND_REDIS_VECTOR_REC_HOST")
    # redis_vector_port = os.environ.get("BACKEND_REDIS_VECTOR_REC_PORT")
    # redis_vector_pass = os.environ.get("BACKEND_REDIS_VECTOR_REC_PASS")

    # # Khởi tạo Redis client
    # r = redis.Redis(host=redis_vector_host, port=redis_vector_port, password=redis_vector_pass)

    # Key của sorted set trong Redis
    sorted_set_key = 'user-product'

    # Khởi tạo danh sách các dòng để tạo DataFrame
    redis_model = []

    # Tìm kiếm theo pattern
    key_pattern = f"{userId}:*"
    cursor = 0
    while True:
        cursor, elements = r.zscan(sorted_set_key, cursor, match=key_pattern)
        for element in elements:
            vecto, timestamp = element
            vecto = vecto.decode('utf-8')
            r_userId, bookId = vecto.split(':')
            redis_model.append((r_userId, bookId, timestamp))
        if cursor == 0:
            break

    if not redis_model:
        return None

    # Sắp xếp các mục theo timestamp và lấy n mục mới nhất
    redis_model.sort(key=lambda x: x[2], reverse=True)
    top_n_items = redis_model[:n]

    # Tạo DataFrame
    track_book_user = pd.DataFrame(top_n_items, columns=['userId', 'bookId', 'timestamp'])
    return track_book_user

###INIT MODEL ###
data = load_model("current/content/books_df")

# tfidf = TfidfVectorizer(stop_words='english')
# tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)

# tfidf_matrix_dense = tfidf_matrix.toarray().astype('float32')
# index = faiss.IndexFlatL2(tfidf_matrix_dense.shape[1])
# index.add(tfidf_matrix_dense)

# data['normalized_title'] = data['book_title'].apply(normalize_text)
# data['normalized_genres'] = data['genres'].apply(normalize_text)  # Thêm cột normalized_genres
# cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# ######## V2 ########
# Load model
data = load_model("current/content/books_df")

# Hàm tách từ và loại bỏ các từ dừng tiếng Việt
def vietnamese_tokenizer(text):
    tokens = ViTokenizer.tokenize(text)
    return tokens

# Chuẩn hóa văn bản
data['normalized_title'] = data['book_title'].apply(vietnamese_tokenizer)
data['normalized_genres'] = data['genres'].apply(vietnamese_tokenizer)

# Tạo TF-IDF vectorizer sử dụng tokenizer tiếng Việt
tfidf = TfidfVectorizer(tokenizer=vietnamese_tokenizer)
tfidf_matrix = tfidf.fit_transform(data['normalized_title'].astype('U').values + ' ' + data['normalized_genres'].astype('U').values)

tfidf_matrix_dense = tfidf_matrix.toarray().astype('float32')
index = faiss.IndexFlatL2(tfidf_matrix_dense.shape[1])
index.add(tfidf_matrix_dense)


# Hàm để gợi ý sách, input là tiêu đề
def get_content_recommendations_by_keyword(title, userId, quantity):
    # data = load_model("current/content/books_df")
    # tfidf = TfidfVectorizer(stop_words='english')
    # tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)
    # cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    keywords = split_keywords(title)

    # Chuẩn hóa tiêu đề sách trong dữ liệu
    data['normalized_title'] = data['book_title'].apply(normalize_text)
    
    # Tìm kiếm các sách có chứa tất cả các từ khóa trong tiêu đề
    mask = pd.Series([True] * len(data))
    for keyword in keywords:
        mask = mask & data['normalized_title'].str.contains(keyword, case=False, na=False)

    selected_books = data[mask]
    
    if selected_books.empty:
        # selected_books = pd.DataFrame(columns=data.columns) 
        mask = data['normalized_title'].str.contains(keywords[0], case=False, na=False)
        selected_books = data[mask]
        # selected_books = selected_books.head(8) 
    else:
        selected_books = selected_books

    idx = selected_books.index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[0:quantity]
    book_indices = [i[0] for i in sim_scores]
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books.to_dict(orient='records')
    selected_books = selected_books.to_dict(orient='records')

    return recommend_books_list, selected_books


def get_content_recommendations_by_keyword_faiss_en(key_words, genres, userId, quantity, page, page_size):
    mask_title = pd.Series([True] * len(data))
    mask_genres = pd.Series([True] * len(data))
    keywords = split_keywords(key_words)
     
    for keyword in keywords:
        mask_title = mask_title & data['normalized_title'].str.contains(keyword, case=False, na=False)
        mask_genres = mask_genres & data['normalized_genres'].str.contains(keyword, case=False, na=False)
    
    if genres != "all":
        genres_list = genres.split(",")
        genre_main = genres_list[-1]
        genre_keywords = split_keywords(genre_main)
        mask_genres = pd.Series([True] * len(data))
        for genre_keyword in genre_keywords:
            mask_genres &= mask_genres & data['normalized_genres'].str.contains(genre_keyword, case=False, na=False)
        selected_books = data[mask_genres | mask_title]
    else:
        selected_books = data[mask_title | mask_genres]
    

    if selected_books.empty and keywords:
        # Lấy từ khóa bỏ từ phải qua trái
        new_keywords = keywords[:-1]
        return get_content_recommendations_by_keyword_faiss(' '.join(new_keywords), genres, userId, quantity, page, page_size)
    
    if selected_books.empty:
        return []
    
    idx = selected_books.index[0]
    D, I = index.search(tfidf_matrix_dense[idx:idx+1], quantity)
    
    recommend_books = data.iloc[I[0]]
    recommend_books['score'] = D[0]
    recommend_books = recommend_books[['book_id', 'book_title', 'genres', 'score']]
    
    # Phân trang
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    recommend_books_paginated = recommend_books.iloc[start_idx:end_idx]
    
    recommend_books_list = recommend_books_paginated.to_dict(orient='records')
    
    return recommend_books_list

def get_content_recommendations_by_keyword_faiss(key_words, genres, userId, quantity, page, page_size):
    mask_title = pd.Series([True] * len(data))
    mask_genres = pd.Series([True] * len(data))
    
    keywords = ViTokenizer.tokenize(key_words).split()
    
    for keyword in keywords:
        mask_title = mask_title & data['normalized_title'].str.contains(keyword, case=False, na=False)
        mask_genres = mask_genres & data['normalized_genres'].str.contains(keyword, case=False, na=False)
    
    if genres != "all":
        genres_list = genres.split(",")
        genre_main = genres_list[-1]
        genre_keywords = ViTokenizer.tokenize(genre_main).split()
        mask_genres = pd.Series([True] * len(data))
        for genre_keyword in genre_keywords:
            mask_genres &= mask_genres & data['normalized_genres'].str.contains(genre_keyword, case=False, na=False)
        selected_books = data[mask_genres | mask_title]
    else:
        selected_books = data[mask_title | mask_genres]
    
    if selected_books.empty and keywords:
        # Lấy từ khóa bỏ từ phải qua trái
        new_keywords = keywords[:-1]
        return get_content_recommendations_by_keyword_faiss(' '.join(new_keywords), genres, userId, quantity, page, page_size)
    
    if selected_books.empty:
        return []
    
    idx = selected_books.index[0]
    D, I = index.search(tfidf_matrix_dense[idx:idx+1], quantity)
    
    recommend_books = data.iloc[I[0]]
    recommend_books['score'] = D[0]
    recommend_books = recommend_books[['book_id', 'book_title', 'genres', 'score']]
    
    # Phân trang
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    recommend_books_paginated = recommend_books.iloc[start_idx:end_idx]
    
    recommend_books_list = recommend_books_paginated.to_dict(orient='records')
    
    return recommend_books_list

# get related book by id
def get_content_recommendations_by_id(book_id, quantity):
    # Kiểm tra xem ID có tồn tại trong dataframe không
    if book_id not in data['book_id'].values:
        print("Sách không tồn tại trong dataframe!")
        return
    
    # Tìm index của cuốn sách trong dataframe dựa trên ID
    idx = data[data['book_id'] == book_id].index[0]
    
    _, I = index.search(tfidf_matrix_dense[idx].reshape(1, -1), quantity + 1)
    book_indices = I[0][1:]  # Loại bỏ chính cuốn sách đã chọn
    
    # Lấy thông tin về các cuốn sách được đề xuất
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books.to_dict(orient='records')
    return recommend_books_list


def get_content_recommendations_by_id_v1(book_id, quantity, data, index, tfidf_matrix_dense):
    print("data['book_id'].values", data['book_id'].values)
    # Kiểm tra xem ID có tồn tại trong dataframe không
    if book_id not in data['book_id'].values:
        print("Sách không tồn tại trong dataframe!")
        return
    
    # Tìm index của cuốn sách trong dataframe dựa trên ID
    idx = data[data['book_id'] == book_id].index[0]
    
    _, I = index.search(tfidf_matrix_dense[idx].reshape(1, -1), quantity + 1)
    book_indices = I[0][1:]  # Loại bỏ chính cuốn sách đã chọn
    
    # Lấy thông tin về các cuốn sách được đề xuất
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books
    return recommend_books_list

def get_content_recommendations_by_id_v2(book_id, quantity, data, index, tfidf_matrix_dense):
    book_id_set = set(data['book_id'].values)

    # Kiểm tra xem ID có tồn tại trong dataframe không
    if book_id not in book_id_set:
        print("Sách không tồn tại trong dataframe!")
        return
    
    # Tìm index của cuốn sách trong dataframe dựa trên ID
    idx = data[data['book_id'] == book_id].index[0]
    
    _, I = index.search(tfidf_matrix_dense[idx].reshape(1, -1), quantity + 1)
    book_indices = I[0][1:]  # Loại bỏ chính cuốn sách đã chọn
    
    # Lấy thông tin về các cuốn sách được đề xuất
    recommend_books = data.iloc[book_indices][['book_id', 'book_title', 'genres']]

    return recommend_books

def update_recommendations(index, data, userId, quantity, tfidf_matrix_dense):
    track_book_user = create_redis_model(userId, 10)

    if track_book_user is None:
        return []

    if userId not in track_book_user['userId'].values:
        print("User không tồn tại trong dataframe!")
        return []
    
    # Lấy danh sách tất cả các bookId mà user đã xem và chuyển thành mảng NumPy
    user_books_array = track_book_user[track_book_user['userId'] == userId]['bookId'].values

    user_books_array = [int(book_id) for book_id in user_books_array]

    # print("user_books_array::", user_books_array)

    # print("user_books_array:::", user_books_array)
    
    combined_sim_scores = np.zeros(len(data))
    for book_id in user_books_array:
        idx = data[data['book_id'] == book_id].index[0]
        D, I = index.search(tfidf_matrix_dense[idx].reshape(1, -1), len(data))
        combined_sim_scores += D.flatten()
    
    combined_sim_scores /= len(user_books_array)
    
    sim_scores = list(enumerate(combined_sim_scores))
    sim_scores = sorted(sim_scores, key=lambda x: x[1])
    
    selected_indices = [data[data['book_id'] == book_id].index[0] for book_id in user_books_array]
    sim_scores = [score for score in sim_scores if score[0] not in selected_indices]
    
    sim_scores = sim_scores[:quantity]
    
    book_indices = [i[0] for i in sim_scores]
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books
    return recommend_books_list


def weighted_combination(book_id, userId, quantity, alpha=0.7):
    current_recommendations = get_content_recommendations_by_id_v1(book_id, quantity, data, index, tfidf_matrix_dense)
    history_recommendations = update_recommendations(index, data, userId, quantity, tfidf_matrix_dense)
    
    # print("history_recommendations::::", history_recommendations)

    if(len(history_recommendations) == 0):
        return current_recommendations.to_dict(orient='records')

    current_recommendations = current_recommendations['book_id'].values.flatten()
    history_recommendations = history_recommendations['book_id'].values.flatten()
    
    current_scores = {book_id: alpha for book_id in current_recommendations}
    history_scores = {book_id: (1 - alpha) for book_id in history_recommendations}

    combined_scores = {}
    
    # Cộng điểm của các đề xuất từ cả hai danh sách
    for book_id, score in current_scores.items():
        if book_id in combined_scores:
            combined_scores[book_id] += score
        else:
            combined_scores[book_id] = score

    for book_id, score in history_scores.items():
        if book_id in combined_scores:
            combined_scores[book_id] += score
        else:
            combined_scores[book_id] = score

    # Sắp xếp các cuốn sách theo điểm số tổng hợp
    sorted_combined_scores = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
    
    # Lấy top N đề xuất
    top_book_ids = [book_id for book_id, score in sorted_combined_scores[:quantity]]
    
    return data[data['book_id'].isin(top_book_ids)].to_dict(orient='records')


############# REDIS MODEL #########################
def create_redis_model_by_recent_days(userId, days, page, page_size):
    # Key của sorted set trong Redis
    sorted_set_key = 'user-product'
    

    # Lấy thời gian hiện tại và tính toán thời gian `days` trước
    now = datetime.now()
    days_ago = now - timedelta(days=days)
    timestamp_days_ago = days_ago.timestamp() * 1000  # Chuyển đổi thành milliseconds nếu cần

    # Tính toán các chỉ số cho phân trang
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size

    # Lấy các phần tử trong khoảng thời gian yêu cầu
    elements = r.zrangebyscore(sorted_set_key, timestamp_days_ago, float('inf'), withscores=True)

    redis_model = []
    for vecto, timestamp in elements:
        vecto = vecto.decode('utf-8')
        r_userId, bookId = vecto.split(':')
        if r_userId == userId:
            redis_model.append((r_userId, bookId, int(timestamp)))

    if not redis_model:
        return None

    # Sắp xếp các mục theo timestamp
    redis_model.sort(key=lambda x: x[2], reverse=True)

    # Lấy các mục cho trang hiện tại
    paginated_items = redis_model[start_idx:end_idx]

    # Tạo DataFrame từ các mục đã phân trang
    track_book_user = pd.DataFrame(paginated_items, columns=['userId', 'bookId', 'timestamp'])

    return track_book_user

def create_redis_model_by_recent_days_v1(userId, days, page, page_size):
    # Key của sorted set trong Redis
    sorted_set_key = 'user-product'

    # Khởi tạo danh sách các dòng để tạo DataFrame
    redis_model = []

    # Tìm kiếm theo pattern
    key_pattern = f"{userId}:*"
    
    cursor = 0
    while True:
        cursor, elements = r.zscan(sorted_set_key, cursor, match=key_pattern)
        for element in elements:
            vecto, timestamp = element
            vecto = vecto.decode('utf-8')
            r_userId, bookId = vecto.split(':')
            redis_model.append((r_userId, bookId, int(timestamp)))
        if cursor == 0:
            break

    if not redis_model:
        return None

    # Lấy thời gian hiện tại và tính toán thời gian `days` trước
    now = datetime.now()
    days_ago = now - timedelta(days=days)
    timestamp_days_ago = days_ago.timestamp()

    # Lọc các mục có timestamp trong `days` ngày gần nhất
    recent_items = [item for item in redis_model if datetime.fromtimestamp(item[2] / 1000) >= days_ago]

    if not recent_items:
        return None

    # Sắp xếp các mục theo timestamp
    recent_items.sort(key=lambda x: x[2], reverse=True)

    # Tính toán các mục bắt đầu và kết thúc cho phân trang
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size

    # Lấy các mục cho trang hiện tại
    paginated_items = recent_items[start_idx:end_idx]

    # Tạo DataFrame từ các mục đã phân trang
    track_book_user = pd.DataFrame(paginated_items, columns=['userId', 'bookId', 'timestamp'])

    return track_book_user

######## Recent Books ###########
def get_content_recommendations_by_recent_books(userId, days, page, page_size, num_rec=5):
    # Tạo mô hình Redis với các cuốn sách gần đây
    recent_books = create_redis_model_by_recent_days(userId, days, page, page_size)

    if recent_books is None or recent_books.empty:
        return []

    # Tạo danh sách để lưu các khuyến nghị
    all_recommendations = []

    # Lấy danh sách bookIds
    book_ids = recent_books['bookId'].tolist()
    
    
    
    # Lặp qua từng bookId để lấy khuyến nghị
    for book_id in book_ids:
        book_id = int(book_id)
        rec_recent_books = get_content_recommendations_by_id_v2(book_id, num_rec, data, index, tfidf_matrix_dense)
        rec_books_list = rec_recent_books.to_dict(orient='records')
        all_recommendations.append({
            'bookId': book_id,
            'recommendations': rec_books_list
        })
    
    return all_recommendations

