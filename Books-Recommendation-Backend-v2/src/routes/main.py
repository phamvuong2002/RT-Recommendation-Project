from fastapi import APIRouter
from src.controllers import hello_controller
from src.controllers import retrain_controller
from src.controllers import rating_controller
from src.controllers import behaviour_controller
from src.controllers import get_recommendation_results_controller
from src.controllers import contentbase_controller
from src.controllers import get_offline_models_controller
from pydantic import BaseModel

router = APIRouter()

# Định nghĩa một model Pydantic cho dữ liệu body
class ModelRequest(BaseModel):
    model_name: str
    model_type: str

@router.get("/hello")
async def hello():
    return await hello_controller.hello()

#### GET RESULTS ##########
@router.get("/get-results/user={userId}&page={page}&limit={limit}")
async def get_results(userId: str, page: int = 1, limit: int = 10):
    return await get_recommendation_results_controller.get_results_by_userId(userId, page, limit)

#### TRAINING ##########
@router.get("/retrain")
async def retrain():
    return await retrain_controller.retrain()

@router.get("/retrain/content-base")
async def rating():
    return await retrain_controller.retrain_content_base()

@router.get("/retrain/behaviour")
async def behaviour():
    return await retrain_controller.retrain_implicit()

@router.get("/retrain/rating-item")
async def rating():
    return await retrain_controller.retrain_rating_item()

@router.get("/retrain/rating-user")
async def rating():
    return await retrain_controller.retrain_rating_user()


@router.get("/retrain/rating-svdpp")
async def rating():
    return await retrain_controller.retrain_rating_svdpp()

@router.get("/retrain/behaviour-svdpp")
async def behaviour():
    return await retrain_controller.retrain_implicit_svdpp()

#### GET OFFLINE MODEL ##########
@router.post("/offline/get-models")
async def get_models(request: ModelRequest):
    return await get_offline_models_controller.get_models_from_S3(model_file_name = request.model_name, model_type=request.model_type)


#### RECOMMEND ##########
@router.get("/rating/popular/{limit}",)
async def popular(limit: int):
    return await rating_controller.get_popular(limit)

@router.get("/rating/search/{book_name}")
async def search(book_name: str = ""):
    return await rating_controller.search_book_name(book_name)

@router.get("/contentbase/recommend/book={book_id}&user={user_id}&quantity={quantity}")
async def recommend(book_id: int = 0, user_id: str = "", quantity: int = 10):
    return await contentbase_controller.get_content_base_recommended_by_id(book_id, user_id, quantity)

@router.get("/contentbase/recommend/key_word={book_name}&user={user_id}&quantity={quantity}")
async def recommend(book_name: str = "", user_id: str = "", quantity: int = 10):
    return await contentbase_controller.get_content_base_recommended_by_keyword(book_name, user_id, quantity)

@router.get("/contentbase/faiss/recommend/key_word={key_words}&genres={genres}&user={user_id}&quantity={quantity}&page={page}&page_size={page_size}")
async def recommend(key_words: str = "", genres: str = "all", user_id: str = "", quantity: int = 100, page: int = 1, page_size: int = 24):
    return await contentbase_controller.get_content_base_recommended_by_keyword_faiss(key_words, genres, user_id, quantity, page, page_size)

@router.get("/rating/content/key_word={book_name}&user={user_id}&quantity={quantity}")
async def recommend(book_name: str = "", user_id: str = "", quantity: int = 10):
    return await rating_controller.get_recommended(book_name, user_id, quantity)

@router.get("/implicit/content/book={book_id}&user={user_id}&quantity={quantity}")
async def recommend(book_id: int = 0, user_id: str = "", quantity: int = 10):
    return await behaviour_controller.get_implicit_content(book_id, user_id, quantity)


@router.get("/rating/user/user={user_id}&quantity={quantity}")
async def recommend(user_id: str = "", quantity: int = 10):
    return await rating_controller.get_recommended_userbased(user_id,quantity)


@router.get("/implicit/user/user={user_id}&quantity={quantity}")
async def recommend(user_id: str = "", quantity: int = 10):
    return await behaviour_controller.get_implicit_userbased(user_id,quantity)


# SVDpp
@router.get("/implicit/svdpp/user={user_id}&quantity={quantity}")
async def recommend(user_id: str = "", quantity: int = 10):
    return await behaviour_controller.get_implicit_svdpp(user_id, quantity)

@router.get("/rating/svdpp/user={user_id}&quantity={quantity}")
async def recommend(user_id: str = "", quantity: int = 10):
    return await rating_controller.get_recommended_rating_svdpp(user_id, quantity)

###Offline###
@router.get("/implicit/offline/content/book={book_id}&user={user_id}&quantity={quantity}")
async def recommend(book_id: int = 0, user_id: str = "", quantity: int = 10):
    return await behaviour_controller.get_implicit_offline_content(book_id, user_id, quantity)


@router.get("/implicit/offline/svdpp/user={user_id}&quantity={quantity}")
async def recommend(user_id: str = "", quantity: int = 10):
    return await behaviour_controller.get_implicit_offline_svd( user_id, quantity)


@router.get("/rating/offline/svdpp/user={user_id}&quantity={quantity}")
async def recommend( user_id: str = "", quantity: int = 10):
    return await rating_controller.get_rating_offline_svd( user_id, quantity)


@router.get("/rating/offline/user/user={user_id}&quantity={quantity}")
async def recommend( user_id: str = "", quantity: int = 10):
    return await rating_controller.get_rating_offline_userbased( user_id, quantity)