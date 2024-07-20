from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.content_base_recommend import get_content_recommendations_by_id, weighted_combination, get_content_recommendations_by_keyword, get_content_recommendations_by_keyword_faiss, get_content_recommendations_by_recent_books
from src.helpers.save_rec_books import save_rec_books


#Gợi ý sách liên quan
async def get_content_base_recommended_by_id(book: str = "", userId: str = "", quantity = 24):
    try:
        # recommendation_on = book
        books = weighted_combination(book, userId, quantity,0.7)
        # books = get_content_recommendations_by_id(book, quantity)
        # results = await save_rec_books(books, user_id=userId, model_type = "content", key="book_id")
        
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))
    
async def get_content_base_recommended_by_keyword(book: str = "", userId: str = "", quantity = 10):
    try:
        # recommendation_on = book
        
        books, selectedBook  = get_content_recommendations_by_keyword(book, userId, quantity)
        
        # results = await save_rec_books(books, user_id=userId, model_type = "content", key="book_id")
        result = {
            'recommendations': books,
            'search': selectedBook
        }
        return SuccessResponse(metadata= result)
    except Exception as e:
        raise BadRequestError(detail=str(e))
    
async def get_content_base_recommended_by_keyword_faiss(key_words: str = "", genres: str = "all",  userId: str = "", quantity = 10, page = 1, page_size = 24):
    try:
        # recommendation_on = book
        books  = get_content_recommendations_by_keyword_faiss(key_words, genres, userId, quantity, page, page_size)
        # results = await save_rec_books(books, user_id=userId, model_type = "content", key="book_id")
        result = {
            'recommendations': books
        }
        return SuccessResponse(metadata= result)
    except Exception as e:
        raise BadRequestError(detail=str(e))

#RECENT BOOKS CONTENT-BASED
async def get_recommendations_for_recent_books(userId: str = "", days: int = 3, page: int = 1, page_size: int = 24):
    try:
        books = get_content_recommendations_by_recent_books(userId, days, page, page_size)
        result = {
            'recommendations': books
        }
        return SuccessResponse(metadata= result)
    except Exception as e:
        raise BadRequestError(detail=str(e))