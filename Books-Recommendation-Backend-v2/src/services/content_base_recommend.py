import pandas as pd
from src.helpers.load_model import load_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Hàm để gợi ý sách, input là tiêu đề
def get_content_recommendations_by_keyword(title):
    data = load_model("current/content/books_df")

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data['book_title'].astype('U').values + ' ' + data['genres'].astype('U').values)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Tìm kiếm sách dựa trên một phần của tiêu đề
    selected_books = data[data['book_title'].str.contains(title, case=False, na=False)]
    if selected_books.empty:
        selected_books = pd.DataFrame(columns=data.columns) 
    else:
        selected_books = selected_books.head(10) 

    idx = selected_books.index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:24]
    book_indices = [i[0] for i in sim_scores]
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books.to_dict(orient='records')
    
    return recommend_books_list

def get_content_recommendations_by_id(book_id):

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
    sim_scores = sim_scores[1:24]
    book_indices = [i[0] for i in sim_scores]
    
    # Lấy thông tin về các cuốn sách được đề xuất
    recommend_books = data.iloc[book_indices]

    recommend_books = recommend_books[['book_id', 'book_title','genres']]
    recommend_books_list = recommend_books.to_dict(orient='records')
    
    return recommend_books_list