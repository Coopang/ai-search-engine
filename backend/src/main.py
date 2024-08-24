import os

from typing import Annotated, List

from fastapi import FastAPI
from fastapi import Query
from fastapi import Depends

from mysql.connector import connect

from dotenv import load_dotenv

from .datatypes import Item
from .constants import API_PREFIX


app = FastAPI()

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
