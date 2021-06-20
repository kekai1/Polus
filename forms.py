from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, EqualTo

class LoginForm(FlaskForm):
    email = StringField("Email: ", validators=[Email("Некорректный email")], render_kw={"placeholder": "Email"})
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=4, max=100, message="Пароль должен быть от 4 до 100 символов")], render_kw={"placeholder": "Пароль"})


    remember = BooleanField("Запомнить", default=False)
    submit = SubmitField("Войти")


class RegisterForm(FlaskForm):
    name = StringField("Имя: ", validators=[Length(min=4, max=100, message="Имя должно быть от 4 до 100 символов")], render_kw={"placeholder": "ФИО"})
    email = StringField("Email: ", validators=[Email("Некорректный email")], render_kw={"placeholder": "Email"})
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=4, max=100, message="Пароль должен быть от 4 до 100 символов")],
                        render_kw={"placeholder": "Пароль", "id": "password-input", "type": "password"})

    psw2 = PasswordField("Повтор пароля: ", validators=[DataRequired(), EqualTo('psw', message="Пароли не совпадают")], render_kw={"placeholder": "Пароль еще раз"})
    submit = SubmitField("Регистрация")


class MessageForm(FlaskForm):
    message = TextAreaField(('Message'), validators=[DataRequired(), Length(min=0, max=990)])
    submit = SubmitField("Отправить")