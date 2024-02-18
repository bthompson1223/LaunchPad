from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text
from .categories_seeds import categories

def seed_categories():
    for category in categories:
        db.session.add(Category(name=category['name'], description=category['description'], ))
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
        
    db.session.commit()