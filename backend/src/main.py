import random

from typing import Annotated, List

from fastapi import FastAPI
from fastapi import Query

from .datatypes import Item
from .constants import API_PREFIX


app = FastAPI()


@app.get(API_PREFIX + '/model/search')
async def search(prompt: Annotated[str, Query(max_length=255)]) -> List[Item]:
    pass
