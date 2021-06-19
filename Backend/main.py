from fastapi import FastAPI
from temproaryModels import NewsModel
from typing import List
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def createNews() -> NewsModel:
    news = {
        'title': 'Album SPiRiTS In The Forest jest z wielu względów wyjątkowy w dorobku Depeche Mode',
        'tags': ['Muzyka Rockowa', 'Albumy', 'Depeche Mode'],
        'image': '/static/pob2.png',
        'date': datetime.now().utcnow()
    }
    return NewsModel(**news)

def createFakeNewsData(number: int) -> List[NewsModel]:
    data = []
    for _ in range(0, number):
        data.append(createNews())
    return data


data = createFakeNewsData(50)

@app.get("/news/get_all", response_model = List[NewsModel])
async def root(offset: int = 0, quantity: int = 50):
    return createFakeNewsData(quantity)