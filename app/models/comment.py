from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), ondelete='CASCADE', nullable=False)
    project_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("projects.id")), ondelete='CASCADE', nullable=False)
    parent = db.Column(db.Integer)

    user = db.relationship('User', back_populates = 'comments')
    project = db.relationship('Project', back_populates = 'comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'parent': self.parent
        }


    