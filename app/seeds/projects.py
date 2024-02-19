from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text
from .projects_seeds import projects
from datetime import datetime

def seed_projects():
    for project in projects:
        project['end_date'] = datetime.strptime(project['end_date'], '%Y-%m-%d').date() 
        db.session.add(Project(
            title= project['title'],
            subtitle= project['subtitle'],
            owner_id = project['owner_id'],
            category_id = project['category_id'],
            location = project['location'],
            story = project['story'],
            risks = project['risks'],
            cover_image = project['cover_image'],
            funding_goal = project['funding_goal'],
            end_date = project['end_date'],  
        ))
    db.session.commit()


def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()