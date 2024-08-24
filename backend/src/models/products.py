from sqlalchemy.ext.automap import automap_base
from sqlalchemy import MetaData
from ..database import engine


metadata = MetaData()
metadata.reflect(engine, only=['products'])

Base = automap_base(metadata=metadata)
Base.prepare()

Products = Base.classes.products
