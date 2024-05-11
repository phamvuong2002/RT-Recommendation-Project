from fastapi import APIRouter
from src.controllers import hello_controller
from src.controllers import retrain_controller
from src.controllers import rating_controller
from src.controllers import behaviour_controller
from src.controllers import get_recommendation_results_controller

router = APIRouter()

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

@router.get("/retrain/behaviour")
async def behaviour():
    return await retrain_controller.retrain_implicit()

@router.get("/retrain/rating-item")
async def rating():
    return await retrain_controller.retrain_rating_item()


#### RECOMMEND ##########
@router.get("/rating/popular/{limit}",)
async def popular(limit: int):
    return await rating_controller.get_popular(limit)

@router.get("/rating/search/{book_name}")
async def search(book_name: str = ""):
    return await rating_controller.search_book_name(book_name)

@router.get("/rating/recommend/key_word={book_name}&user={user_id}")
async def recommend(book_name: str = "", user_id: str = ""):
    return await rating_controller.get_recommended(book_name, user_id)

@router.get("/implicit/content/book={book_id}&user={user_id}")
async def recommend(book_id: int = 0, user_id: str = ""):
    return await behaviour_controller.get_implicit_content(book_id, user_id)

