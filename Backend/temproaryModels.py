from pydantic import BaseModel
from uuid import UUID, uuid4
from typing import List, Literal
from datetime import datetime

tags = 'news'


class NewsModel(BaseModel):
    id: UUID = uuid4()
    title: str
    tags: List[str] = []
    date: datetime = None
