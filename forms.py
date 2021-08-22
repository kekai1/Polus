from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, EqualTo

class LoginForm(FlaskForm):
    email = StringField("Email: ", validators=[Email("Некорректный email")], render_kw={"placeholder": "Email"})
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=5, max=100, message="Пароль должен быть от 5 до 100 символов")],
                        render_kw={"placeholder": "Пароль", "id": "password-input"})


    remember = BooleanField("Запомнить", default=False)
    submit = SubmitField("Войти", render_kw={"id": "submit"})


class RegisterForm(FlaskForm):
    name = StringField("ФИО: ", validators=[Length(min=3, max=100)], render_kw={"placeholder": "ФИО"})
    email = StringField("Email: ", validators=[Email("Некорректный email")], render_kw={"placeholder": "Email"})
    psw = PasswordField("Пароль: ", validators=[DataRequired(), Length(min=7)],
                        render_kw={"placeholder": "Пароль", "id": "password-input", "type": "password",
                        "pattern" : "^(?=.*?[a-z])(?=.*?[0-9]).{7,}$", "required oninvalid" :
                        "setCustomValidity('Пароль должен быть минимум из 7 символов. Должен содержать как минимум одну цифру и одну заглавную букву.')",
                        "oninput": "setCustomValidity('')"})

    psw2 = PasswordField("Повтор пароля: ", validators=[DataRequired(), EqualTo('psw', message="Пароли не совпадают")],
                         render_kw={"placeholder": "Пароль еще раз", "id": "password-input2", "font-family": "'Ubuntu', sans-serif"})
    submit = SubmitField("Регистрация")


class MessageForm(FlaskForm):
    message = TextAreaField(('Message'), validators=[DataRequired(), Length(min=0, max=990)])
    submit = SubmitField("Отправить")


class RessetForm(FlaskForm):
    email = StringField("Email: ", validators=[Email("Некорректный email")], render_kw={"placeholder": "Email"})
    submit = SubmitField("Подтвердить")


class Edit_Password(FlaskForm):
    old_psw = PasswordField("Cтарый пароль: ", validators=[DataRequired()],
                         render_kw={"id": "old_psw"})
    psw = PasswordField("Новый пароль: ", validators=[DataRequired(), Length(min=7)],
                        render_kw={"id": "password-input", "type": "password",
                                   "pattern": "^(?=.*?[a-z])(?=.*?[0-9]).{7,}$", "required oninvalid":
                                       "setCustomValidity('Пароль должен быть минимум из 7 символов. Должен содержать как минимум одну цифру и одну заглавную букву.')",
                                   "oninput": "setCustomValidity('')"})

    psw2 = PasswordField("Повторите новый пароль: ", validators=[DataRequired(), EqualTo('psw', message="Пароли не совпадают")],
                         render_kw={"id": "password-input2", "type": "password"})
    submit=SubmitField("Обновить пароль")