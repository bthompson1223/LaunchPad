from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class NewProjectForm(FlaskForm):
    title = StringField("Project Title", validators=[DataRequired(), Length(max= 255, message="Title must be less than 255 letters")])
    subtitle = StringField("Project Subtitle", validators=[DataRequired(), Length(max= 255, message="Subtitle must be less than 255 letters")])
    location = StringField("Location", validators=[DataRequired(), Length(max= 255, message="Location must be less than 255 letters")])
    story = StringField("Story", validators=[DataRequired()])
    risks = StringField("Risks", validators=[DataRequired()])
    cover_image = FileField('Project Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    funding_goal = IntegerField("Funding Goal", validators=[DataRequired])
    end_date = DateField("End Date", validators=[DataRequired])