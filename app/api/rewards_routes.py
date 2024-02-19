from flask import Blueprint, request
from flask_login import current_user, login_required
from ...app.models import Reward, db
from .aws_helpers import upload_file_to_s3, get_unique_filename
from ..forms import RewardForm

reward_routes = Blueprint('rewards', __name__)

# update reward for a project
@login_required
@reward_routes.route('/<int:rewardId>', methods=['PUT'])
def update_reward(rewardId):
    reward = Reward.query.get(rewardId)

    if not reward:
        return {'errors': {'message': "Reward not found"}}, 404
    
    if current_user.id is not reward.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    form = RewardForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cover_image = form.data["cover_image"]
        cover_image.filename = get_unique_filename(cover_image.filename)
        upload = upload_file_to_s3(cover_image)
        print(upload)

        if "url" not in upload:
            return upload

        remove_file_from_s3(project['cover_image'])


        project['title'] = form.data['title'] or project['title']
        project['subtitle'] = form.data["subtitle"] or project['subtitle'],
        project['category_id'] = form.data["category_id"],
        project['location'] = form.data["location"] or project['location'],
        project['story'] = form.data["story"] or project['story'],
        project['risks'] = form.data["risks"] or project['risks'],
        project['cover_image'] = upload["url"],
        project['funding_goal'] = form.data["funding_goal"] or project['funding_goal'],
        project['end_date'] = form.data["end_date"] or project['end_date']
    

        db.session.commit()
        return project.to_dict()
    return form.errors, 401
