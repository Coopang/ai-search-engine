from pydantic import BaseModel
from typing import Optional


class ProductsBase(BaseModel):
    title: str
    price: int
    reviews_cnt: int
    rating: float
    image_url: str


class ProductsCreate(ProductsBase):
    pass


class Products(ProductsBase):
    id: int

    class Config:
        orm_mode = True

