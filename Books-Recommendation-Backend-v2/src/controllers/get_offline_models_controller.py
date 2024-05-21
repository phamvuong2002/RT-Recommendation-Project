from src.core.error_responses import BadRequestError
from src.core.success_responses import SuccessResponse
from src.services.get_offline_models_service import get_offline_models

async def get_models_from_S3(model_file_name: str=None, model_type: str = None):
    try:
        isSuccess = get_offline_models(model_name=model_file_name, location=model_type)
        if isSuccess != True:
            raise BadRequestError(detail="Save model failed")
        return SuccessResponse(metadata={"message": f"Save model successfully"})
    except Exception as e:
        raise BadRequestError(detail=str(e))