import os
import re

from typing import Annotated, List

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from mysql.connector import connect

from pytrends.request import TrendReq

from dotenv import load_dotenv

from sentence_transformers import SentenceTransformer, util

import google.generativeai as genai

import pandas as pd

from .datatypes import Item, Trend
from .constants import API_PREFIX


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
trend_req = TrendReq()

model = SentenceTransformer('distiluse-base-multilingual-cased-v1')
df = pd.read_csv('chatpang_sbert_embeddings_v1.csv', encoding='utf-8')
df['Embeddings_Title'] = df['Embeddings_Title'].apply(eval)  
df['Embeddings_Keyword'] = df['Embeddings_Keyword'].apply(eval)

load_dotenv()

genai.configure(api_key=os.environ['API_KEY'])

def search_clothes(query, df_o, top_n=48, weight_title=1, weight_keyword=2):
    df = df_o.copy()
    query_embedding = model.encode(query)

    try:
        df['Similarity_Title'] = df['Embeddings_Title'].apply(lambda x: util.cos_sim(query_embedding, x))
        df['Similarity_Keyword'] = df['Embeddings_Keyword'].apply(lambda x: util.cos_sim(query_embedding, x))

        df['Weighted_Average_Similarity'] = (
            (df['Similarity_Title'] * weight_title) + 
            (df['Similarity_Keyword'] * weight_keyword)
        ) / (weight_title + weight_keyword)

        df['Weighted_Average_Similarity'] = df['Weighted_Average_Similarity'].astype(float)
        
        top_results = df.nlargest(top_n, 'Weighted_Average_Similarity')
        # print("Top Results : ")
        # for index, row in top_results.iterrows():
        #     print(f"Title: {row['title']}, Similarity: {row['Weighted_Average_Similarity']}")
        
        return {
            "titles": top_results['title'].tolist(),
            "similarities": top_results['Weighted_Average_Similarity'].tolist()
        }
    except Exception as e:
        print(f"Error during processing: {e}")
        return None


@app.get(API_PREFIX + '/model/search')
async def search(prompt: Annotated[str, Query(max_length=255)]):
    connection = connect(
        host=os.environ['MYSQL_HOST'],
        port=os.environ['MYSQL_PORT'],
        password=os.environ['MYSQL_ROOT_PASSWORD'],
        user=os.environ['MYSQL_USERNAME'],
    )
    cursor = connection.cursor()

    prompts = search_clothes(prompt, df, top_n=16, weight_title=1, weight_keyword=2)
    command = """
        SELECT DISTINCT title, product_id, price, reviews_count, rating, image_url 
        FROM coopang_ai_search_engine.products
        WHERE
            title = %s
    """

    products = []
    for title in prompts['titles']:
        cursor.execute(command, (title,))
        products.extend(cursor.fetchall())

    items = []

    items = [Item(
         id=product[1],
         title=product[0],
         price=product[2],
         reviews_cnt=product[3],
         rating=product[4],
         image_url=product[5],
         similarity=similarity,
     ) for product, similarity in zip(products, prompts['similarities'])]

    cursor.close()
    connection.close()

    model = genai.GenerativeModel(model_name='gemini-1.5-pro-latest')
    response = model.generate_content(f"can you give me 5 sentences that can refine or specify by nuances the user's query '{prompt}'. No additional explanation, just the sentence.")

    sentences = response.text.strip().split("\n")
    cleaned_sentences = [re.sub(r'^\d+\.\s*', '', sentence).strip() for sentence in sentences]
    
    results = {f"result{i+1}": sentence for i, sentence in enumerate(cleaned_sentences)}

    return {
        "items": items,
        "results": results
    }


@app.get(API_PREFIX + '/trends')
async def request_trends():
    top_trending = trend_req.trending_searches(pn='south_korea')

    trends = {f'rank{rank}': trend_content for rank, trend_content in list(enumerate(top_trending[0], start=1))[:3]}

    return trends
