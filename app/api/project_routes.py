from flask import Blueprint, request
from flask_login import current_user, login_required
from ...app.models import Project, db
from .aws_helpers import upload_file_to_s3, get_unique_filename

project_routes = Blueprint('projects', __name__)

@project_routes.route('/')
def all_projects():
    projects = Project.query.all()

    return [project.to_dict() for project in projects]

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
    form = NewProject()

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
            end_data = form.data["end_data"]
        )

        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    return form.errors, 401