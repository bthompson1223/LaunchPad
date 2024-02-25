from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileField, FileRequired
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class EditRewardForm(FlaskForm):
    name = StringField("Reward Name", validators=[DataRequired(), Length(max= 255, message="Project name must be less than 255 letters")])
    description = StringField("Reward Description", validators=[DataRequired()])
    img_url = FileField('Reward Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    amount = IntegerField("Pledge Amount", validators=[DataRequired()])
    est_delivery_date = DateField("Estimated Delivery Date", validators=[DataRequired()])
    quantity = IntegerField("Reward Quantity", validators=[DataRequired()])
