from pydantic import BaseModel


class Trend(BaseModel):
    content: str
    rank: int
