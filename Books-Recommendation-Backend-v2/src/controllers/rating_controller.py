from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.collaborative_rating_popularity_recommender import popular_books_top
from src.services.collaborative_rating_recommender import recommendFor
from src.services.collaborative_rating_search import search_book
from src.helpers.save_rec_books import save_rec_books

from src.services.collaborative_rating_user import rating_user
from src.services.collaborative_rating_svdpp import rating_svdpp

# Gợi ý sách được mua nhiều nhất
async def get_popular(limit: int):
    try:
        return SuccessResponse(metadata= await popular_books_top(limit))
    except Exception as e:
        raise BadRequestError(detail=str(e))

# Tìm kiếm dựa theo từ khoá
async def search_book_name(book_name: str = ""):
    try:
        return SuccessResponse(metadata= await search_book(book_name))
    except Exception as e:
        raise BadRequestError(detail=str(e))

#Gợi ý sách liên quan
async def get_recommended(book: str = "", userId: str = ""):
    try:
        recommendation_on = await search_book(book, 1)
        books = await recommendFor(recommendation_on[0]['book_id'])
        results = await save_rec_books(books, user_id=userId, key="book_id")
        return SuccessResponse(metadata= {'recommendation': results})
    except Exception as e:
        raise BadRequestError(detail=str(e))


# Goi ý top n sản phẩm dựa trên User_based
async def get_recommended_userbased(userId: str = ""):
    try:
        books =  rating_user(userId,10)
        print(books)
        results = await save_rec_books(books, user_id=userId, key="book_id")
        return SuccessResponse(metadata= {'recommendation': results})
    except Exception as e:
        raise BadRequestError(detail=str(e))

# Rating SVDpp
async def get_recommended_rating_svdpp(userId: str = ""):
    try:
        books =  rating_svdpp(userId,10)
        # print(books)
        results = await save_rec_books(books, user_id=userId, key="book_id")
        return SuccessResponse(metadata= {'recommendation': results})
    except Exception as e:
        raise BadRequestError(detail=str(e))