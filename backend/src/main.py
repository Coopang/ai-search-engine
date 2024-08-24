import os

from typing import Annotated, List

from fastapi import FastAPI
from fastapi import Query

from mysql.connector import connect

from pytrends.request import TrendReq

from dotenv import load_dotenv

from .datatypes import Item, Trend
from .constants import API_PREFIX


app = FastAPI()
trend_req = TrendReq()

load_dotenv()


@app.get(API_PREFIX + '/model/search')
async def search(prompt: Annotated[str, Query(max_length=255)]) -> List[Item]:
    connection = connect(
        host=os.environ['MYSQL_HOST'],
        port=os.environ['MYSQL_PORT'],
        password=os.environ['MYSQL_ROOT_PASSWORD'],
        user=os.environ['MYSQL_USERNAME'],
    )
    cursor = connection.cursor()
    command = """SELECT * FROM coopang_ai_search_engine.products LIMIT 5"""

    cursor.execute(command)

    products = cursor.fetchall()
    items = []

    items = [Item(
         id=product[0],
         title=product[1],
         price=product[2],
         reviews_cnt=product[4],
         rating=product[5],
         image_url=product[6],
     ) for product in products]

    cursor.close()
    connection.close()

    return items


@app.get(API_PREFIX + '/trends')
async def request_trends():
    top_trending = trend_req.trending_searches(pn='south_korea')

    trends = {f'rank{rank}': trend_content for rank, trend_content in enumerate(top_trending[0], start=1)}

    return trends
