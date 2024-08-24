import os
import csv

from mysql.connector import connect, Error
from dotenv import load_dotenv


load_dotenv()
if __name__ == '__main__':
    data = []
    with open('prod-processed-clothes.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')

        next(reader)

        for row in reader:
            data.append(tuple(row[2:]))

    try:
        with connect(
            host=os.environ['MYSQL_HOST'],            
            port=os.environ['MYSQL_PORT'],
            password=os.environ['MYSQL_ROOT_PASSWORD'],
            user=os.environ['MYSQL_USERNAME']
        ) as connection:
            command = """
                INSERT INTO coopang_ai_search_engine.products
                (title, image_url, price, rating, reviews_count, category)
                VALUES (%s, %s, %s, %s, %s, %s)
            """

            with connection.cursor() as cursor:
                cursor.executemany(command, data)
                connection.commit()

        print('Done')
    except Error as e:
        print(e)
