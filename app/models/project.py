from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(255), nullable=False)
    subtitle= db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    category_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("categories.id")), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    story = db.Column(db.Text, nullable=False)
    risks = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.String, nullable=False)
    funding_goal = db.Column(db.Integer, nullable=False)
    end_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner = db.relationship('User', back_populates = 'projects')
    rewards = db.relationship('Reward', back_populates = 'project', cascade = 'all, delete-orphan')
    comments = db.relationship('Comment', back_populates = 'project', cascade = 'all, delete-orphan')
    backers = db.relationship('Backer', back_populates = 'project', cascade = 'all, delete-orphan')
    likes = db.relationship('Like', back_populates = 'project', cascade = 'all, delete-orphan')
    category = db.relationship('Category', back_populates = 'projects')
    
    def to_dict(self):
        owner = self.owner.to_dict()
        backers_amounts = [backer.reward.amount for backer in self.backers]
        backers = len(backers_amounts)
        total_funded = sum(backers_amounts)

        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "owner": owner,
            "category_id": self.category_id,
            "category": self.category.name,
            "location": self.location,
            "story": self.story,
            "risks": self.risks,
            "coverImage": self.cover_image,
            "fundingGoal": self.funding_goal,
            "end_date": self.end_date,
            "numOfBackers": backers,
            "totalFunded": total_funded,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
