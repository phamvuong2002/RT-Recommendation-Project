from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.content_base_recommend import weighted_combination, get_content_recommendations_by_keyword
from src.helpers.save_rec_books import save_rec_books


#Gợi ý sách liên quan
async def get_content_base_recommended_by_id(book: str = "", userId: str = "", quantity = 10):
    try:
        # recommendation_on = book
        books = weighted_combination(book, userId, quantity,0.7)
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