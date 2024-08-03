from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.collaborative_implicit_content import implicit_content, implicit_offline_content
from src.helpers.save_rec_books import save_rec_books
from src.services.collaborative_implicit_user import implicit_user
from src.services.collaborative_implicit_svdpp import implicit_svdpp, implicit_offline_svdpp
from src.services.collaborative_implicit_recommender import implicit_rec

#online-content
async def get_implicit_content(book_id: int, user_id: str, quantity = 10):
    try:
        books = implicit_content(book_id, quantity)
        result = await save_rec_books(books= books, user_id= user_id, model_type="behaviour")
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))



# IMPLICIT - SVDPP
async def get_implicit_svdpp(user_id: str, quantity = 10):
    try:
        books = implicit_svdpp(user_id, quantity)
        # if(books is not None):
        #     result = await save_rec_books(books= books, user_id= user_id, model_type="behaviour_svd", key='book_id')
        #     # print(result)
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

#online-user
async def get_implicit_userbased(user_id: str, quantity = 10):
    try:
        books = implicit_user(user_id, quantity)
        result = await save_rec_books(books= books, user_id= user_id, model_type="behaviour", key='book_id')
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

#IMPLICIT - RECOMMENDER
async def get_implicit_rec(user_id: str, quantity = 10):
    try:
        books = implicit_rec(user_id, quantity)
        if(books is not None):
            result = await save_rec_books(books= books, user_id= user_id, model_type="behaviour_implicit", key='book_id')
            # print(result)
        # print(books)
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))
    
#offline-content
async def get_implicit_offline_content(book_id: int, user_id: str, quantity = 10):
    try:
        books = implicit_offline_content(book_id, quantity)
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

async def get_implicit_offline_svd(user_id: str, quantity = 10):
    try:
        books = implicit_offline_svdpp(user_id, quantity)
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

