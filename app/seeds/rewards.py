from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text
from .rewards_seeds import rewards
from datetime import datetime

def seed_rewards():
    for reward in rewards:
        reward['est_delivery_date'] = datetime.strptime(reward['est_delivery_date'], '%Y-%m-%d').date() 
        db.session.add(Reward(
            name= reward['name'],
            description= reward['description'],
            img_url = reward['img_url'],
            amount = reward['amount'],
            est_delivery_date = reward['est_delivery_date'],
            quantity = reward['quantity'],
            project_id = reward['project_id']
        ))
    db.session.commit()


def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))
        
    db.session.commit()