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

def normalize_text(text):
    # Thay thế dấu gạch ngang bằng khoảng trắng
    text = text.replace('-', ' ')
    # Loại bỏ các ký tự không mong muốn
    text = re.sub(r'[^\w\s-]', '', text)
    # Loại bỏ dấu tiếng Việt và chuyển về chữ thường
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('utf-8')
    return text.lower()

def split_keywords(title):
    title = title.replace(',', ' ')
    title = title.replace('-', ' ')
    # Tách tiêu đề thành các từ khóa nhỏ hơn
    words = title.split()
    normalized_words = [normalize_text(word) if not word.isdigit() else r'\b' + re.escape(str(word)) + r'\b' for word in words]
    # normalized_words = [normalize_text(word) if not word.isdigit() else str(word) for word in words]
    return normalized_words

def create_redis_model():
    # Tách tiêu đề thành các từ khóa nhỏ hơn
    redis_vector_host = os.environ.get("BACKEND_REDIS_VECTOR_REC_HOST")
    redis_vector_port = os.environ.get("BACKEND_REDIS_VECTOR_REC_PORT")
    redis_vector_pass = os.environ.get("BACKEND_REDIS_VECTOR_REC_PASS")

    r = redis.Redis(host=redis_vector_host, port=redis_vector_port, password=redis_vector_pass)
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

###INIT MODEL ###
data = load_model("current/content/books_df")

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)

tfidf_matrix_dense = tfidf_matrix.toarray().astype('float32')
index = faiss.IndexFlatL2(tfidf_matrix_dense.shape[1])
index.add(tfidf_matrix_dense)

data['normalized_title'] = data['book_title'].apply(normalize_text)
data['normalized_genres'] = data['genres'].apply(normalize_text)  # Thêm cột normalized_genres
# cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)


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

# Hàm để gợi ý sách, input là từ khoá chứa các từ nằm trong title hoặc cate
def get_content_recommendations_by_keyword_faiss(key_words, genres, userId, quantity, page, page_size):
    # genres = "sach-tieng-viet,manga-comic,manga,series-manga"
    # genres = "all"
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


# def update_recommendations(cosine_sim, books_df, userId,quantity):
#     track_book_user = create_redis_model()

#     if userId not in track_book_user['userId'].values:
#         print("User không tồn tại trong dataframe!")
#         return
   
#     # Lấy danh sách tất cả các bookId mà user đã xem và chuyển thành mảng NumPy
#     user_books_array = track_book_user[track_book_user['userId'] == userId]['bookId'].values

#     user_books_array = [int(book_id) for book_id in user_books_array]
    
#     # print("Book picked: ", user_books_array)
    
#     combined_sim_scores = np.zeros(cosine_sim.shape[0])
#     for book_id in user_books_array:
#         idx = books_df[books_df['book_id'] == book_id].index[0]
#         combined_sim_scores += cosine_sim[idx]
    
#     combined_sim_scores /= len(user_books_array)
    
#     sim_scores = list(enumerate(combined_sim_scores))
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
#     selected_indices = [books_df[books_df['book_id'] == book_id].index[0] for book_id in user_books_array]
#     sim_scores = [score for score in sim_scores if score[0] not in selected_indices]
    
#     sim_scores = sim_scores[:quantity]
    
#     book_indices = [i[0] for i in sim_scores]
#      # # Lấy thông tin về các cuốn sách được đề xuất
#     recommend_books = books_df.iloc[book_indices]

#     recommend_books = recommend_books[['book_id', 'book_title','genres']]
#     recommend_books_list = recommend_books
#     # .to_dict(orient='records')
    
#     return recommend_books_list

# def get_content_recommendations_by_id(book_id, quantity,data, cosine_sim):
#     # Kiểm tra xem ID có tồn tại trong dataframe không
#     if book_id not in data['book_id'].values:
#         print("Sách không tồn tại trong dataframe!")
#         return
    
#     # Tìm index của cuốn sách trong dataframe dựa trên ID
#     idx = data[data['book_id'] == book_id].index[0]
    
#     sim_scores = list(enumerate(cosine_sim[idx]))

#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
#     # # Lấy ra index của 'quantity' cuốn sách có độ tương tự cao nhất, loại bỏ chính cuốn sách đã chọn
#     sim_scores = sim_scores[1:quantity]
#     book_indices = [i[0] for i in sim_scores]

    
#     # # Lấy thông tin về các cuốn sách được đề xuất
#     recommend_books = data.iloc[book_indices]

#     recommend_books = recommend_books[['book_id', 'book_title','genres']]
#     recommend_books_list = recommend_books
#     # .to_dict(orient='records')
    
#     return recommend_books_list

# #Get recommendations by book_id
# def weighted_combination(book_id,userId,quantity,alpha=0.7):
#     # data = load_model("current/content/books_df")
#     # tfidf = TfidfVectorizer(stop_words='english')
#     # tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)
#     # cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
#     current_recommendations = get_content_recommendations_by_id(book_id,quantity,data,cosine_sim)
#     history_recommendations = update_recommendations(cosine_sim,data,userId, quantity)
#     current_recommendations = current_recommendations['book_id'].values.flatten()
#     history_recommendations = history_recommendations['book_id'].values.flatten()
    
#     current_scores = {book_id: alpha for book_id in current_recommendations}
#     print("FINAL: ")
#     history_scores = {book_id: (1 - alpha) for book_id in history_recommendations}

#     combined_scores = {}
    
#     # Cộng điểm của các đề xuất từ cả hai danh sách
#     for book_id, score in current_scores.items():
#         if book_id in combined_scores:
#             combined_scores[book_id] += score
#         else:
#             combined_scores[book_id] = score

#     for book_id, score in history_scores.items():
#         if book_id in combined_scores:
#             combined_scores[book_id] += score
#         else:
#             combined_scores[book_id] = score
    
#     # Sắp xếp các cuốn sách theo điểm số tổng hợp
#     sorted_combined_scores = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
    
#     # Lấy top 5 đề xuất
#     top_book_ids = [book_id for book_id, score in sorted_combined_scores[:quantity]]
    
    
#     return data[data['book_id'].isin(top_book_ids)].to_dict(orient='records')

def get_content_recommendations_by_id(book_id, quantity, data, index, tfidf_matrix_dense):
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

def update_recommendations(index, data, userId, quantity, tfidf_matrix_dense):
    track_book_user = create_redis_model()

    if userId not in track_book_user['userId'].values:
        print("User không tồn tại trong dataframe!")
        return
    
    # Lấy danh sách tất cả các bookId mà user đã xem và chuyển thành mảng NumPy
    user_books_array = track_book_user[track_book_user['userId'] == userId]['bookId'].values
    user_books_array = [int(book_id) for book_id in user_books_array]
    
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

def update_recommendations(index, data, userId, quantity, tfidf_matrix_dense):
    track_book_user = create_redis_model()

    if userId not in track_book_user['userId'].values:
        print("User không tồn tại trong dataframe!")
        return
    
    # Lấy danh sách tất cả các bookId mà user đã xem và chuyển thành mảng NumPy
    user_books_array = track_book_user[track_book_user['userId'] == userId]['bookId'].values
    user_books_array = [int(book_id) for book_id in user_books_array]
    
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
    current_recommendations = get_content_recommendations_by_id(book_id, quantity, data, index, tfidf_matrix_dense)
    history_recommendations = update_recommendations(index, data, userId, quantity, tfidf_matrix_dense)
    
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
