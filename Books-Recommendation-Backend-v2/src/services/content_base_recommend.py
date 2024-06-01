import pandas as pd
from src.helpers.load_model import load_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import unicodedata

def normalize_text(text):
    # Loại bỏ dấu tiếng Việt và chuyển về chữ thường
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('utf-8')
    return text.lower()

def split_keywords(title):
    # Tách tiêu đề thành các từ khóa nhỏ hơn
    words = title.split()
    normalized_words = [normalize_text(word) for word in words]
    return normalized_words


# Hàm để gợi ý sách, input là tiêu đề
def get_content_recommendations_by_keyword(title, quantity):
    
    data = load_model("current/content/books_df")
   

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

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
    sim_scores = sim_scores[1:quantity]
    book_indices = [i[0] for i in sim_scores]
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books.to_dict(orient='records')
    selected_books = selected_books.to_dict(orient='records')

    return recommend_books_list, selected_books

def get_content_recommendations_by_id(book_id, quantity):

    data = load_model("current/content/books_df")
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Kiểm tra xem ID có tồn tại trong dataframe không
    if book_id not in data['book_id'].values:
        print("ID không tồn tại trong dataframe!")
        return
    
    # Tìm index của cuốn sách trong dataframe dựa trên ID
    idx = data[data['book_id'] == book_id].index[0]
    
    # Tính toán độ tương tự với các cuốn sách khác
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Lấy ra index của 24 cuốn sách có độ tương tự cao nhất, loại bỏ chính cuốn sách đã chọn
    sim_scores = sim_scores[1:quantity]
    book_indices = [i[0] for i in sim_scores]
    
    # Lấy thông tin về các cuốn sách được đề xuất
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books.to_dict(orient='records')
    
    return recommend_books_list