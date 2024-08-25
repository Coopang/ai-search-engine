from pydantic import BaseModel


class Item(BaseModel):
    id: int
    title: str
    price: int
    reviews_cnt: int
    rating: float
    image_url: str
    similarity: float

