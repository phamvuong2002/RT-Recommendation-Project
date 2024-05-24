from src.core.success_responses import SuccessResponse
from src.core.error_responses import BadRequestError
from src.services.training_implicit_service import train_implicit_model
from src.services.training_rating_item_service import train_rating_item_model
from src.services.training_content_base_service import train_content_base_model
from src.services.training_rating_user_service import train_rating_user_model
from src.services.training_implicit_svdpp import train_implicit_model_SVDpp
from src.services.training_rating_svdpp import train_rating_model_SVDpp
async def retrain():
    return SuccessResponse (metadata= {"message": "Retraining started!"})

# Retraining Book ContentBase Model
async def retrain_content_base():
    try:
        return SuccessResponse(metadata= await train_content_base_model())
    except Exception as e:
        raise BadRequestError(detail=str(e))

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


# Retraining Rating User Model
async def retrain_rating_user():
    try:
        return SuccessResponse(metadata= await train_rating_user_model())
    except Exception as e:
        raise BadRequestError(detail=str(e))

# Retraining Rating User Model
async def retrain_implicit_svdpp():
    try:
        return SuccessResponse(metadata= await train_implicit_model_SVDpp())
    except Exception as e:
        raise BadRequestError(detail=str(e))

# Retraining Rating User Model
async def retrain_rating_svdpp():
    try:
        return SuccessResponse(metadata= await train_rating_model_SVDpp())
    except Exception as e:
        raise BadRequestError(detail=str(e))