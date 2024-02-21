from flask import Blueprint, request
from flask_login import current_user, login_required
from ...app.models import Reward,  Backer, db
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
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
        data = request.json
        
        if "img_url" in data: 
            img_url = form.data["img_url"]
            img_url.filename = get_unique_filename(img_url.filename)
            upload = upload_file_to_s3(img_url)
            print(upload)

            if "url" not in upload:
                return upload

            remove_file_from_s3(reward['img_url'])
        
        reward['name'] = form.data['name'] or reward['name']
        reward['description'] = form.data['description'] or reward['description']
        reward['img_url'] = upload['img_url'] or reward['img_url']
        reward['amount'] = form.data['amount'] or reward['amount']
        reward['est_delivery_date'] = form.data['est_delivery_date'] or reward['est_delivery_date']
        reward['quantity'] = form.data['quantity'] or reward['quantity']

        db.session.commit()
        return reward.to_dict()
    return form.errors, 401

# delete reward 
@login_required
@reward_routes.route('/<int:rewardId>', methods=['DELETE'])
def delete_reward(rewardId):
    reward = Reward.query.get(rewardId)

    if not reward:
        return {'errors': {'message': "Reward not found"}}, 404
    
    if current_user.id is not reward.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    db.session.delete(reward)
    db.session.commit()

    return {"message": f"Successfully deleted reward {reward['name']}"}

# add a backer (pledge a reward)
@login_required
@reward_routes.route('/<int:rewardId>/backing', methods=['POST'])
def add_backer(rewardId):
    reward = Reward.query.get(rewardId)
    if not reward:
        return {'errors': {'message': "Reward not found"}}, 404

    if current_user.id is reward.owner_id:
        return {'errors': {'message': "Owner of the project must not pledge reward"}}, 404

    new_backer = Backer(
        user_id = current_user.id,
        project_id =  reward.project_id,
        reward_id = rewardId
    )

    db.session.add(new_backer)
    db.session.commit()
    return new_backer.to_dict()   

@login_required
@reward_routes.route('/<int:rewardId>/backing', methods=["DELETE"])
def remove_backer(rewardId):
    pass