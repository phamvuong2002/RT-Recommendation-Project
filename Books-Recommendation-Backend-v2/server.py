from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import argparse
from functools import lru_cache
from pydantic import BaseModel
from src.routes import main
import config

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    name: str


@lru_cache()
def get_settings():
    return config.Settings()

# Routes
app.include_router(main.router)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Book Recommender API")
    parser.add_argument("-e", "--env", default="dev")
    parser.add_argument("-w", "--workers", default=1, type=int)
    args = parser.parse_args()
    host = get_settings().backend_host
    port = get_settings().backend_port
    workers = args.workers

    if args.env == "dev":
        print("Server started successfully in DEV mode")
        uvicorn.run(
            "server:app",
            host=host,
            port=port,
            reload=True,
            env_file="./config/.env.dev"
        )
    else:
        print("Server started successfully in PRODUCTION mode")
        uvicorn.run(
            "server:app",
            host=host,
            port=port,
            env_file="./config/.env.prod",
            workers=workers,
        )