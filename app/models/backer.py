from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Backer(db.Model):
    __tablename__ = 'backers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    project_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('projects.id')), nullable=False)
    reward_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('rewards.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates = 'backers')
    project = db.relationship('Project', back_populates = 'backers')
    reward = db.relationship('Reward', back_populates = 'backers')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'project': self.project,
            'reward_id': self.reward_id,
            'reward': self.reward,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }




