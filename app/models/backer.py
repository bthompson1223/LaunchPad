from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

class Backers(db.Model):
    __tablename__ = 'backers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), ondelete='CASCADE', nullable=False)
    project_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('projects.id')), ondelete='CASCADE', nullable=False)
    reward_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('rewards.id')), ondelete='CASCADE', nullable=False)

    user = db.relationship('User', back_populates = 'backers')
    project = db.relationship('Project', back_populates = 'backers')
    reward = db.relationship('Reward', back_populates = 'backers')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'reward_id': self.reward_id
        }




