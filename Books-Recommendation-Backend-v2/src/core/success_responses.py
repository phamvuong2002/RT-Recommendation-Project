class StatusCode:
    OK = 200
    CREATED = 201

class ReasonStatusCode:
    OK = "Success"
    CREATED = "Created!"

class SuccessResponse:
    def __init__(self, message=None, statusCode=StatusCode.OK, reasonStatusCode=ReasonStatusCode.OK, metadata={}):
        self.message = message if message else reasonStatusCode
        self.status = statusCode
        self.metadata = metadata

    def send(self, res, headers={}):
        return res.status(self.status).json(self.__dict__)

class OK(SuccessResponse):
    def __init__(self, message=None, metadata={}):
        super().__init__(message=message, metadata=metadata)

class CREATED(SuccessResponse):
    def __init__(self, options={}, message=None, statusCode=StatusCode.CREATED, reasonStatusCode=ReasonStatusCode.CREATED, metadata={}):
        super().__init__(message=message, statusCode=statusCode, reasonStatusCode=reasonStatusCode, metadata=metadata)
        self.options = options
