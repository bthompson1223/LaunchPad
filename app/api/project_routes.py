from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import Project, Category, User, Reward, db
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms import ProjectForm, RewardForm

project_routes = Blueprint('projects', __name__)

@project_routes.route('/')
def all_projects():
    projects = Project.query.all()

    return [project.to_dict() for project in projects]

@project_routes.route('/<category>')
def find_category_projects(category):
    projects = Project.query.all()
    projects_dict = [project.to_dict() for project in projects]

    return [project for project in projects_dict if project["category"].lower() == category.lower()]

@project_routes.route('/<int:projectId>')
def get_project(projectId):
    project = Project.query.get(projectId)

    if project:
        return project.to_dict()
    else:
        return {"errors": {"message": "Project not found"}}, 404

@login_required    
@project_routes.route('/', methods=["POST"])
def new_project():
    form = ProjectForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cover_image = form.data["cover_image"]
        cover_image.filename = get_unique_filename(cover_image.filename)
        upload = upload_file_to_s3(cover_image)
        print(upload)

        if "url" not in upload:
            return upload
        
        new_project = Project(
            title = form.data["title"],
            subtitle = form.data["subtitle"],
            owner_id = current_user.id,
            category_id = form.data["category_id"],
            location = form.data["location"],
            story = form.data["story"],
            risks = form.data["risks"],
            cover_image = upload["url"],
            funding_goal = form.data["funding_goal"],
            end_date = form.data["end_date"]
        )

        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    return form.errors, 401


@login_required
@project_routes.route('/<int:projectId>', methods=['PUT'])
def update_project(projectId):
    project = Project.query.get(projectId)

    if not project:
        return {'errors': {'message': "Project not found"}}, 404
    
    if current_user.id is not project.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    form = ProjectForm()

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

@login_required
@project_routes.route('/<int:projectId>', methods=['DELETE'])
def delete_project(projectId):
    project = Project.query.get(projectId)

    if not project:
        return {'errors': {'message': "Project not found"}}, 404
    
    if current_user.id is not project.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    db.session.delete(project)
    db.session.commit()

    return {"message": f"Successfully deleted project {project['title']}"}

# Get all rewards for a project
@project_routes.route('/<int:projectId>/rewards')
def get_rewards(projectId):
    rewards = Reward.query.filter(Reward.project_id == projectId).all()
    if rewards:
        return [reward.to_dict() for reward in rewards]
    else: 
        return {"errors": {"message": "Incorrect projectId or this project has no rewards"}}, 404
    
# create reward for a project
@login_required
@project_routes.route('/<int:projectId>/rewards', methods=['POST'])
def new_reward():
    form = RewardForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        img_url = form.data["img_url"]
        img_url.filename = get_unique_filename(img_url.filename)
        upload = upload_file_to_s3(img_url)
        print(upload)

        if "url" not in upload:
            return upload
        
        new_reward = Reward(
            name = form.data["name"],
            description = form.data["description"],
            img_url = upload["url"],
            amuont = form.data["amuont"],
            est_delivery_date  = form.data["est_delivery_date"],
            quantity = form.data["quantity"]
        )

        db.session.add(new_reward)
        db.session.commit()
        return new_reward.to_dict()
    return form.errors, 401

# update reward for a project
@login_required
@project_routes.route('/<int:projectId>/rewards', methods=['POST'])
def update_reward():