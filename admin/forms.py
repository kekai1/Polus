from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Length

class LoginForm(FlaskForm):
    user = StringField("Логин: ", validators=[Length(min=4, max=100, message="Логин должен быть от 4 до 100 символов")])
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=4, max=100, message="Пароль должен быть от 4 до 100 символов")])
    submit = SubmitField("Войти")
