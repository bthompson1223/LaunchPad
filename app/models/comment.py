from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    parent = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates = 'comments')
    project = db.relationship('Project', back_populates = 'comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_image': self.user.profile_img,
            'username': self.user.username,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'parent': self.parent,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'replies': []
        }


    