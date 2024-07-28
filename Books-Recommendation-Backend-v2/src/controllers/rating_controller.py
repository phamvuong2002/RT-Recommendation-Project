from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.collaborative_rating_popularity_recommender import popular_books_top
from src.services.collaborative_rating_recommender import recommendFor
from src.services.collaborative_rating_search import search_book
from src.helpers.save_rec_books import save_rec_books

from src.services.collaborative_rating_user import rating_user, rating_offline_user
from src.services.collaborative_rating_svdpp import rating_svdpp, rating_offline_svdpp
import itertools

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
async def get_recommended(book: str = "", userId: str = "", quantity: int = 10):
    try:
        recommendation_on = await search_book(book)
        rec_books_lists = []
        for book in recommendation_on:
            rec_book = await recommendFor(book['book_id'], quantity)
            rec_books_lists.append(rec_book)

        all_books = list(itertools.chain(*rec_books_lists)) 
        # Loại bỏ trùng lặp
        seen_book_ids = set()
        unique_books = []
        for book in all_books:
            if book['book_id'] not in seen_book_ids:
                unique_books.append(book)
                seen_book_ids.add(book['book_id'])
        # results = await save_rec_books(books, user_id=userId, key="book_id")
        return SuccessResponse(metadata= {'recommendations': unique_books[:quantity]})
    except Exception as e:
        raise BadRequestError(detail=str(e))


# Goi ý top n sản phẩm dựa trên User_based
async def get_recommended_userbased(userId: str = "", quantity = 10):
    try:
        books =  rating_user(userId,quantity)
        # print(books)
        if(books is not None):
            results = await save_rec_books(books, user_id=userId, model_type="rating_user",key="book_id")
            # print(result)
        
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

# Rating SVDpp
async def get_recommended_rating_svdpp(userId: str = "", quantity = 10):
    try:
        books =  rating_svdpp(userId,quantity)
        # print(books)
        # if(books is not None):
        #     results = await save_rec_books(books, user_id=userId,  model_type="rating_svd",key="book_id")
            # print(result)
        
        return SuccessResponse(metadata= {'recommendations': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

# OFFLINE
async def get_rating_offline_svd(userId: str = "",quantity=10):
    try:
        books =  rating_offline_svdpp(userId,quantity)
        if(books is not None):
            results = await save_rec_books(books, user_id=userId,  model_type="rating_svd",key="book_id")
            # print(result)
        # print(books)
        # results = await save_rec_books(books, user_id=userId, key="book_id")
        return SuccessResponse(metadata= {'recommendation': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))

async def get_rating_offline_userbased(userId: str = "", quantity=10):
    try:
        books =  rating_offline_user(userId,quantity)
        if(books is not None):
            results = await save_rec_books(books, user_id=userId, model_type="rating_user",key="book_id")
            # print(result)
        # print(books)
        # results = await save_rec_books(books, user_id=userId, key="book_id")
        return SuccessResponse(metadata= {'recommendation': books})
    except Exception as e:
        raise BadRequestError(detail=str(e))