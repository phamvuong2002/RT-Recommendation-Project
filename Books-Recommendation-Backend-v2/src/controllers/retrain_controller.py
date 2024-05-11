from src.core.success_responses import SuccessResponse
from src.core.error_responses import BadRequestError
from src.services.training_implicit_service import train_implicit_model
from src.services.training_rating_item_service import train_rating_item_model

async def retrain():
    return SuccessResponse (metadata= {"message": "Retraining started!"})

# Retraining Implicit Model
async def retrain_implicit():
    try:
        return SuccessResponse(metadata= await train_implicit_model())
    except Exception as e:
        raise BadRequestError(detail=str(e))

# Retraining Rating Item Model
async def retrain_rating_item():
    try:
        return SuccessResponse(metadata= await train_rating_item_model())
    except Exception as e:
        raise BadRequestError(detail=str(e))