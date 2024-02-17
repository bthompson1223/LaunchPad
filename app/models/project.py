from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(255), nullable=False)
    subtitle= db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), ondelete='CASCADE', nullable=False)
    categoy_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("categories.id")), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    story = db.Column(db.Text, nullable=False)
    risks = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.String, nullable=False)
    funding_goal = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Date)

    owner = db.relationship('User', back_populates = 'projects')
    rewards = db.relationship('Reward', back_populates = 'project', cascade = 'all, delete-orphan')
    comments = db.relationship('Comment', back_populates = 'project', cascade = 'all, delete-orphan')
    likes = db.relationship('Like', back_populates = 'project', cascade = 'all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "owner_id": self.owner_id,
            "categoy_id": self.categoy_id,
            "location": self.location,
            "story": self.story,
            "risks": self.risks,
            "cover_image": self.cover_image,
            "funding_goal": self.funding_goal,
            "end_date": self.end_date
        }
