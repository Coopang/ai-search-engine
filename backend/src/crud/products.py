from sqlalchemy.orm import Session

from .. import models, schemas


def get_products(db: Session):
    return db.query(models.Products).all()
