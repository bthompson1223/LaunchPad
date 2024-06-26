from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import Project, Category, User, Backer, Reward, Comment, db, Like
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms import ProjectForm, RewardForm, EditProjectForm
from sqlalchemy import or_

project_routes = Blueprint('projects', __name__)

@project_routes.route('/')
def all_projects():
    search = request.args.get("search", type=str)
    if search:
        projects = Project.query.filter(or_(Project.title.ilike(f"%{search}%"), Project.story.ilike(f"%{search}%"), Project.subtitle.ilike(f"%{search}%"))).all()
        return [project.to_dict() for project in projects]

    category = request.args.get("category", type=str)

    query = Project.query

    if 'page' in request.args and 'per_page' in request.args:
        if category == "All":
            pagination = query.paginate()

        else:
            category_obj = Category.query.filter(Category.name == category).first()
            filtered_projects = query.filter_by(category_id = category_obj.id)
            pagination = filtered_projects.paginate()

        projects = [project.to_dict() for project in pagination.items]
        
        if request.args.get("page", type=int) > pagination.pages:
          return jsonify({'error': 'Invalid page number'}), 400
        
        pagination_data = {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "totalPages": pagination.pages,
            "totalProjects": pagination.total
        }

        response = {
            "projects": projects,
            "pagination": pagination_data
        }

        return jsonify(response)
    else:
        projects = query.all()
        return [project.to_dict() for project in projects]

# @project_routes.route('/<category>')
# def find_category_projects(category):
#     projects = Project.query.all()
#     projects_dict = [project.to_dict() for project in projects]

#     return [project for project in projects_dict if project["category"].lower() == category.lower()]

@project_routes.route('/<int:projectId>')
def get_project(projectId):
    project = Project.query.get(projectId)

    if project:
        return project.to_dict()
    else:
        return {"errors": {"message": "Project not found"}}, 404
    
@login_required
@project_routes.route('/created-projects')
def created_projects():
    projects = Project.query.filter(current_user.id == Project.owner_id).all()
    if projects:
        return [project.to_dict() for project in projects]
    else:
        return []
    
@login_required
@project_routes.route('/backed-projects')
def backed_project_rewards():
    backings = Backer.query.filter(current_user.id == Backer.user_id).all()
    if backings:
        return [backing.to_dict() for backing in backings]
    else:
        return {"errors": {"message": "Backings not found"}}, 404
        

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
    
    form = EditProjectForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cover_image = form.data["cover_image"]
        upload = None

        if not isinstance(cover_image, str) and cover_image is not None:
            cover_image.filename = get_unique_filename(cover_image.filename)
            upload = upload_file_to_s3(cover_image)

            if "url" not in upload:
                return upload

            remove_file_from_s3(project.cover_image)
        
        project.title = form.data['title'] or project.title
        project.subtitle = form.data["subtitle"] or project.subtitle
        project.category_id = form.data["category_id"] or project.category_id
        project.location = form.data["location"] or project.location
        project.story = form.data["story"] or project.story
        project.risks = form.data["risks"] or project.risks
        project.cover_image = upload["url"] if upload else project.cover_image
        project.funding_goal = form.data["funding_goal"] or project.funding_goal
        project.end_date = form.data["end_date"] or project.end_date
    
        db.session.commit()
        return project.to_dict()
    return form.errors, 401

# Delete a project
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

    return {"message": f"Successfully deleted project"}

# Get all rewards for a project
@project_routes.route('/<int:projectId>/rewards')
def get_rewards(projectId):
    project = Project.query.get(projectId)
    
    if not project: 
         return {'errors': {'message': "Project not found"}}, 404
    
    rewards = Reward.query.filter(Reward.project_id == projectId).all()
    if rewards:
        return [reward.to_dict() for reward in rewards]
    else: 
        return []
    
# create reward for a project
@login_required
@project_routes.route('/<int:projectId>/rewards', methods=['POST'])
def new_reward(projectId):
    project = Project.query.get(projectId)

    if not project:
        return {'errors': {'message': "Project not found"}}, 404

    if current_user.id is not project.owner_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
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
            amount = form.data["amount"],
            est_delivery_date  = form.data["est_delivery_date"],
            quantity = form.data["quantity"],
            project_id = projectId,
            owner_id = current_user.id
        )

        db.session.add(new_reward)
        db.session.commit()
    
        return new_reward.to_dict()
    return form.errors, 401

def build_nested_comments(comments_dict, parent_id=None):
    nested_comments = []
    for comment_id, comment in comments_dict.items():
        if comment['parent'] == parent_id:
            # Recursive call to find replies to this comment
            comment['replies'] = build_nested_comments(comments_dict, comment_id)
            nested_comments.append(comment)
    return nested_comments

@project_routes.route('/<int:projectId>/comments')
def get_comments(projectId):
    comments = Comment.query.filter(Comment.project_id == projectId).all()
    comments_dict = {comment.id: comment.to_dict() for comment in comments}

    nested_comments = build_nested_comments(comments_dict)

    return nested_comments
   

@login_required
@project_routes.route('/<int:projectId>/comments', methods=["POST"])
def create_comment(projectId):

    data = request.json

    if 'comment' in data: 
        comment = data['comment'] 
    else: 
        comment =  data['reply']

    if 'parentId' in data:
        parent = data['parentId']
    else:
        parent = None

    new_comment = Comment(
        comment = comment,
        project_id = projectId,
        user_id = current_user.id,
        parent = parent
    )
    try:
        db.session.add(new_comment)
        db.session.commit()
    except:
        return {"errors": {
            "message": "Comment required"
        }}

    return new_comment.to_dict()
  

def delete_nested_comments(comment):
    replies = Comment.query.filter_by(parent=comment.id).all()
    for reply in replies:
        delete_nested_comments(reply)
    
    db.session.delete(comment)
    db.session.commit()

@login_required
@project_routes.route('/<int:projectId>/comments/<int:commentId>/delete', methods=["DELETE"])
def delete_comment(projectId, commentId):
    comment = Comment.query.get(commentId)

    if not comment:
        return {'errors': {'message': "Comment not found"}}, 404
    
    if current_user.id is not comment.user_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    delete_nested_comments(comment)

    return {"message": f"Successfully deleted comment"}


@project_routes.route('/<int:projectId>/likes', methods=["POST", "GET"])
def like_project(projectId):
    project = Project.query.get(projectId)

    if not project:
        return {'errors': {'message': "Project not found"}}, 404
    
    if request.method == "POST":
        new_like = Like(
            project_id = projectId,
            user_id = current_user.id
        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()
    else:
        likes = Like.query.filter(Like.project_id == projectId).all()
        return [like.to_dict() for like in likes]
    
@login_required
@project_routes.route('/<int:projectId>/likes/<int:likeId>', methods=["DELETE"])
def unlike_project(projectId, likeId):
    like = Like.query.get(likeId)

    if not like:
        return {'errors': {'message': "Like not found"}}, 404
    
    if current_user.id is not like.user_id:
        return {'errors': {'message': "Unauthorized"}}, 401
    
    db.session.delete(like)
    db.session.commit()

    return {"message": f"Successfully unliked project"}