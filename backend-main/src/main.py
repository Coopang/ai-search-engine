import os

from fastapi.middleware.cors import CORSMiddleware

from typing import Annotated, List, Dict
from pytrends.request import TrendReq
from . import sqlenv

from mysql.connector import connect

from dotenv import load_dotenv

import pandas as pd

from .datatypes import Item
from .constants import API_PREFIX

import google.generativeai as genai

from fastapi import FastAPI, Query, HTTPException, APIRouter
from pydantic import BaseModel

import re


GEM_API_KEY = sqlenv.GEM_API_KEY
genai.configure(api_key=GEM_API_KEY)


# import sqlenv

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
trend_req = TrendReq()

load_dotenv()


class Item(BaseModel):
    id: int
    title: str
    price: float
    reviews_cnt: int
    rating: float
    image_url: str
    

@app.get(API_PREFIX + '/model/search2')
async def search(prompt: Annotated[str, Query(max_length=255)]) -> List[Item]:
    connection = connect(
        host=sqlenv.MYSQL_HOST,
        port=sqlenv.MYSQL_PORT,
        password=sqlenv.MYSQL_ROOT_PASSWORD,
        user=sqlenv.MYSQL_USERNAME
    )
    cursor = connection.cursor()
    command = """SELECT * FROM coopang_ai_search_engine.products"""

    cursor.execute(command)

    products = cursor.fetchall()
    items = []

    for product in products:
        items.append(Item(
            id=product[0],
            title=product[1],
            price=product[2],
            reviews_cnt=product[4],
            rating=product[5],
            image_url=product[6],
        ))

    cursor.close()
    connection.close()

    return items


@app.get(API_PREFIX + '/model/search')
async def search(prompt: Annotated[str, Query(max_length=255)]) -> dict:
    # 데이터베이스 연결
    connection = connect(
        host=sqlenv.MYSQL_HOST,
        port=sqlenv.MYSQL_PORT,
        password=sqlenv.MYSQL_ROOT_PASSWORD,
        user=sqlenv.MYSQL_USERNAME
    )
    cursor = connection.cursor()
    command = """SELECT * FROM coopang_ai_search_engine.products LIMIT 5"""

    cursor.execute(command)

    products = cursor.fetchall()
    items = []

    for product in products:
        items.append(Item(
            id=product[0],
            title=product[1],
            price=product[2],
            reviews_cnt=product[4],
            rating=product[5],
            image_url=product[6],
        ))

    cursor.close()
    connection.close()

    # GenerativeModel을 사용하여 results 생성
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    response = model.generate_content(f"can you give me 5 sentences that can refine or specify by nuances the user's query '{prompt}'. No additional explanation, just the sentence.")
    
    sentences = response.text.strip().split("\n")
    cleaned_sentences = [re.sub(r'^\d+\.\s*', '', sentence).strip() for sentence in sentences]
    
    results = {f"result{i+1}": sentence for i, sentence in enumerate(cleaned_sentences)}

    # items와 results를 함께 반환
    return {
        "items": items,
        "results": results
    }

@app.get(API_PREFIX + '/trends')
async def request_trends():
    top_trending = trend_req.trending_searches(pn='south_korea')

    trends = {f'rank{rank}': trend_content for rank, trend_content in enumerate(top_trending[0], start=1)}

    return trends



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
