from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import StringField, IntegerField, DateField, SelectField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS

categories = [(1, "Arts"), (2, "Comics-Illustrations"), (3, "Design-Tech"), (4, "Film"), (5, "Food-Craft"), (6, "Games"), (7, "Music"), (8, "Publishing")]


class EditProjectForm(FlaskForm):
    title = StringField("Project Title", validators=[DataRequired(), Length(max= 255, message="Title must be less than 255 letters")])
    subtitle = StringField("Project Subtitle", validators=[DataRequired(), Length(max= 255, message="Subtitle must be less than 255 letters")])
    category_id = SelectField("Category", validators=[DataRequired()], choices=categories)
    location = StringField("Location", validators=[DataRequired(), Length(max= 255, message="Location must be less than 255 letters")])
    story = StringField("Story", validators=[DataRequired()])
    risks = StringField("Risks", validators=[DataRequired()])
    cover_image = FileField('Project Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    funding_goal = IntegerField("Funding Goal", validators=[DataRequired()])
    end_date = DateField("End Date", validators=[DataRequired()])