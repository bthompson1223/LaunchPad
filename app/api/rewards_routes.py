from flask import Blueprint, request
from flask_login import current_user, login_required
from ...app.models import Reward, db
from .aws_helpers import upload_file_to_s3, get_unique_filename

reward_routes = Blueprint('rewards', __name__)


