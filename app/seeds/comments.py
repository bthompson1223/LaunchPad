from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from .comments_seeds import comments

def seed_comments():
    for comment in comments:
        db.session.add(Comment(
            comment = comment['comment'],
            user_id = comment['user_id'],
            project_id  = comment['project_id'],  
        ))
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()