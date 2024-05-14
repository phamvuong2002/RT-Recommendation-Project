from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.collaborative_implicit_content import implicit_content
from src.helpers.save_rec_books import save_rec_books
from src.services.collaborative_implicit_user import implicit_user

async def get_implicit_content(book_id: int, user_id: str):
    try:
        books = implicit_content(book_id, 10)
        result = await save_rec_books(books= books, user_id= user_id, model_type="behaviour")
        return SuccessResponse(metadata= {'recommendations': result})
    except Exception as e:
        raise BadRequestError(detail=str(e))

async def get_implicit_content_userbased(user_id: str):
    try:
        books = implicit_user(user_id, 10)
        result = await save_rec_books(books= books, user_id= user_id, model_type="behaviour", key='book_id')
        return SuccessResponse(metadata= {'recommendations': result})
    except Exception as e:
        raise BadRequestError(detail=str(e))