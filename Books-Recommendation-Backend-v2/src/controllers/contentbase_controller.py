from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.content_base_recommend import get_content_recommendations_by_id, get_content_recommendations_by_keyword
from src.helpers.save_rec_books import save_rec_books


#Gợi ý sách liên quan
async def get_content_base_recommended_by_id(book: str = "", userId: str = "", quantity = 10):
    try:
        recommendation_on = book
        books = get_content_recommendations_by_id(recommendation_on, quantity)
        # results = await save_rec_books(books, user_id=userId, model_type = "content", key="book_id")
        
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))
    
async def get_content_base_recommended_by_keyword(book: str = "", userId: str = "", quantity = 10):
    try:
        recommendation_on = book
        
        books, selectedBook  = get_content_recommendations_by_keyword(recommendation_on, quantity)
        
        # results = await save_rec_books(books, user_id=userId, model_type = "content", key="book_id")
        result = {
            'recommendations': books,
            'search': selectedBook
        }
        return SuccessResponse(metadata= result)
    except Exception as e:
        raise BadRequestError(detail=str(e))