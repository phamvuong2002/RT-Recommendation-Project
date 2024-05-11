from src.core.success_responses import SuccessResponse
from src.core.error_responses import BadRequestError
from src.services.get_recommendation_results import get_books_from_sorted_set



# Retraining Implicit Model
async def get_results_by_userId(userId: str, page: int = 1, page_size: int = 10):
    try:
        return SuccessResponse(metadata= await get_books_from_sorted_set(user_id=userId, page=page, page_size=page_size))
    except Exception as e:
        raise BadRequestError(detail=str(e))