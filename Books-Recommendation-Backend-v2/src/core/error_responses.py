from fastapi import HTTPException

class ErrorResponse(HTTPException):
    def __init__(self, status_code, detail=None):
        self.status_code = status_code
        self.detail = detail

class ConflictRequestError(ErrorResponse):
    def __init__(self, detail=None):
        super().__init__(status_code=409, detail=detail)

class BadRequestError(ErrorResponse):
    def __init__(self, detail=None):
        super().__init__(status_code=400, detail=detail)

class AuthFailureError(ErrorResponse):
    def __init__(self, detail=None):
        super().__init__(status_code=401, detail=detail)

class NotFoundError(ErrorResponse):
    def __init__(self, detail=None):
        super().__init__(status_code=404, detail=detail)

class ForbiddenError(ErrorResponse):
    def __init__(self, detail=None):
        super().__init__(status_code=403, detail=detail)
