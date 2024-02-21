from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .projects import seed_projects, undo_projects
from .rewards import seed_rewards, undo_rewards
from .comments import seed_comments, undo_comments
from .backers import seed_backers, undo_backers

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_backers()
        undo_comments()
        undo_rewards()
        undo_projects()
        undo_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_projects()
    seed_rewards()
    seed_comments()
    seed_backers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_backers()
    undo_comments()
    undo_rewards()
    undo_projects()
    undo_categories()
    undo_users()
    # Add other undo functions here
