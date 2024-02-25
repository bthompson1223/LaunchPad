from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from app.api.aws_helpers import ALLOWED_EXTENSIONS

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    first_name = StringField('first name', validators=[DataRequired()])
    last_name = StringField('last name', validators=[DataRequired()])
    profile_img = FileField('profile image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    email = EmailField('email', validators=[DataRequired(), user_exists])
    password = PasswordField('password', validators=[DataRequired()])
