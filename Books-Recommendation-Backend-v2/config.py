from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    backend_name: str = "book-recommender-api"
    backend_port: int = 4123
    backend_host: str = "0.0.0.0"
