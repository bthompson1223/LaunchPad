from app.models import db, Backer, environment, SCHEMA
from sqlalchemy.sql import text
from .backers_seeds import backers

def seed_backers():
    for backer in backers:
        db.session.add(Backer(
            user_id = backer['user_id'],
            project_id  = backer['project_id'],  
            reward_id = backer['reward_id'],  
        ))
    db.session.commit()


def undo_backers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.backers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backers"))
        
    db.session.commit()