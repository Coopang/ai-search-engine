import os
import csv

from mysql.connector import connect, Error
from dotenv import load_dotenv


load_dotenv()

def upload_to_database(file, slice, command_order):
    print(file)
    data = []

    with open(file, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')

        next(reader)

        for row in reader:
            data.append(tuple(row[slice]))

    if file.startswith('./data/loogle'):
        data = list(map(lambda line: line[:3] + line[4:], data))

    try:
        with connect(
            host=os.environ['MYSQL_HOST'],            
            port=os.environ['MYSQL_PORT'],
            password=os.environ['MYSQL_ROOT_PASSWORD'],
            user=os.environ['MYSQL_USERNAME']
        ) as connection:
            command = f"INSERT INTO coopang_ai_search_engine.products {command_order} VALUES (%s, %s, %s, %s, %s, %s)"

            with connection.cursor() as cursor:
                cursor.executemany(command, data)
                connection.commit()

        print('Done')
    except Error as e:
        print(e)

if __name__ == '__main__':
    upload_to_database('./data/prod-processed-clothes.csv', slice(2, None), '(title, image_url, price, rating, reviews_count, category)')
    upload_to_database('./data/loogle-processed.csv', slice(1, None), '(title, price, category, rating, reviews_count, image_url)')


