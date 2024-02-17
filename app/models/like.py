from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), ondelete='CASCADE', nullable=False)
    project_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('projects.id')), ondelete='CASCADE', nullable=False)

    user = db.relationship
