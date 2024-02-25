from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    est_delivery_date = db.Column(db.Date, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    project = db.relationship('Project', back_populates = 'rewards')
    backers = db.relationship('Backer', back_populates = 'reward', cascade = 'all, delete-orphan')
    owner = db.relationship('User', back_populates = 'rewards')

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "img_url": self.img_url,
            "amount": self.amount,
            "est_delivery_date": self.est_delivery_date,
            "quantity": self.quantity,
            "project_id": self.project_id,
            "backers": len(self.backers),
            "owner_id": self.owner_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    





