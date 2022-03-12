from flask import Flask, render_template, url_for, request, flash, redirect, make_response, send_from_directory, session
import os
from FDataBase import FDataBase
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from UserLogin import UserLogin
from forms import LoginForm, RegisterForm, RessetForm, Edit_Password
from flaskext.mysql import MySQL
from admin.admin import admin
from flask_moment import Moment
import random
from threading import Thread
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer




MAX_CONTENT_LENGTH = 1024 * 1024




#Конфигурационные настройки проекта, и связь с БД-----------------------------------------------
app = Flask(__name__)
app.debug = False

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = '*******'
app.config['MYSQL_DATABASE_PASSWORD'] = ''*******''
app.config['MYSQL_DATABASE_DB'] = '*******'
app.config['MYSQL_DATABASE_HOST'] = '*******'
app.config['SECRET_KEY'] = '*******'

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = '*******'
app.config['MAIL_DEFAULT_SENDER'] = '*******'
app.config['MAIL_PASSWORD'] = '*******'

mail = Mail(app)
moment = Moment(app)
#app.config['SESSION_COOKIE_SAMESITE'] = "Lax"
#app.config['SESSION_COOKIE_SECURE'] = "True"
mysql.init_app(app)
#Конфигурационные настройки проекта, и связь с БД КОНЕЦ-----------------------------------------------



app.register_blueprint(admin, url_prefix='/admin')

#Проверка входа пользователя в сессии перед url запросом-----------------------------------------------
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Войдите в систему, для доступа к интересующей странице'
login_manager.login_message_category = 'error'
#Проверка входа пользователя в сессии перед url запросом КОНЕЦ-----------------------------------------------



#При каждом обращении браузера к клиенту, он получает наш id и понимает с каким пользователем работает
@login_manager.user_loader
def load_user(user_id):
    print('load user')
    return UserLogin().fromDB(user_id, dbase)


#Устанавливаем содеинение с БД для всей текущей сессии
@app.before_request
def before_request():
    """Устанавливаем соединение с БД перед выполнением запроса"""
    global dbase, db
    db = mysql.connect()
    dbase = FDataBase(db)



@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


####Работа с куки------------------------------------------------------------
@app.route('/cookie/')
def cookie():
    r = make_response("Setting a cookie")
    r.set_cookie("cookie1", "cookie_value", secure=True)
    r.set_cookie("cookie2", "cookie_value", httponly=True)
    r.set_cookie("cookie3", "cookie_value", samesite='Lax')
    r.set_cookie("cookie4", "cookie_value", secure=True, httponly=True)
    r.set_cookie("cookie5", "cookie_value", httponly=True, samesite='Lax')
    return r
####КОНЕЦ работы с куки------------------------------------------------------------


#АВТОРИЗАЦИЯ, РЕГИСТРАЦИЯ И РАБОТА С ПРОФИЛЕМ-----------------------------------------------------
def send_async_email(msg):
    with app.app_context():
        mail.send(msg)

def send_email(subject, recipients, html_body):
    msg = Message(subject, recipients=recipients)
    msg.html = html_body
    thr = Thread(target=send_async_email, args=[msg])
    thr.start()

def send_confirmation_email(user_email):
    confirm_serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    confirm_url = url_for('confirm_email', token=confirm_serializer.dumps(user_email, salt='email-confirmation-salt'), _external=True)
    html = render_template('user/email_confirmation.html', confirm_url=confirm_url)
    send_email('Подтвердите Ваш электронный адрес ', [user_email], html)


@app.route('/confirm/<token>')
def confirm_email(token):
    try:
        confirm_serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
        email = confirm_serializer.loads(token, salt='email-confirmation-salt', max_age=3600)
    except:
        flash('Ссылка для подтверждения недействительна или срок ее действия истек. Выполните выход в аккаунт для повторного получения ссылки', category='error')
        return redirect(url_for('login'))
    user = dbase.getUserByEmail(email)
    if user[6]:
        flash('Аккаунт уже подтвержден', 'success')
    else:
        set_user = dbase.email_confirmedUser(user[0], True)
        flash('Ваша учетная запись успешно подтвержденна', 'success')
    return redirect(url_for('login'))


@app.route('/register', methods = ["GET", "POST"])
def register():
    authenticated = False
    if current_user.is_authenticated:
        return redirect('profile')
    form = RegisterForm()
    if form.psw.data != form.psw2.data:
        flash('Пароли не совпадают', category='error')
        return render_template("user/register.html", form=form, title=1)
    if form.validate_on_submit():
            hash = generate_password_hash(request.form['psw'])
            res = dbase.addUser(form.name.data, form.email.data, hash)
            if res:
                send_confirmation_email(form.email.data)
                flash('Вы успешно зарегистрированны, чтобы активировать аккаунт, на вашу почту было выслано письмо с активацией', category='success')
                return redirect(url_for('login'))
            else:
                flash('Пользователь с таким email уже существует', category='error')
    return render_template("user/register.html", form=form, title=1)

###Страницы помощи--------------------------------------------
#@app.route('/company')
#def company():
#    authenticated = False
#    if current_user.is_authenticated:
#        authenticated = True
#    return render_template('base/company.html', authenticated=authenticated)


@app.route('/help_technics')
def help_technics():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    return render_template('base/help_technics.html', authenticated=authenticated)


@app.route('/politics_personalinf')
def politics_personalinf():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    return render_template('base/politics_personalinf.html', authenticated=authenticated)
###Страницы помощи Конец--------------------------------------------


@app.route('/', methods = ["GET", "POST"])
@app.route('/login', methods = ["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))
    form = LoginForm()
    if form.validate_on_submit():
        user = dbase.getUserByEmail(form.email.data)
        if user and check_password_hash(user[3], form.psw.data):
            if user[6] == 0:
                flash('Аккаунт не активирован, на почту указанную при регистрации было отправлено письмо с активацией', category='info')
                send_confirmation_email(form.email.data)
                return render_template("user/login.html", form=form, title=1)
            userlogin = UserLogin().create(user)
            rm = form.remember.data
            login_user(userlogin, remember = rm)
            session['loggedin'] = True
            session['username'] = current_user.getName()

            return redirect(request.args.get("next") or url_for('profile'))
        flash('Неверные логин или пароль', 'error')
    return render_template("user/login.html", form = form,  title=1)





@app.route('/reset_password', methods = ["GET", "POST"])
def reset_password():
    form = RessetForm()
    if form.validate_on_submit():

        chars = '+-/*!&$#?=@<>abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        password =  ''
        for i in range(8):
            password += random.choice(chars)
        hash_password = generate_password_hash(password)
        res = dbase.password_edit(form.email.data, hash_password)

        html = render_template('user/reset_password_email.html', password=password)
        send_email('Подтвердите Ваш электронный адрес ', [form.email.data], html)
        flash('Письмо отправлено!', 'info')
        return redirect(url_for('login'))
    return render_template("user/reset_password.html", form = form,  title=1)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('loggedin', None)
    session.pop('username', None)
    flash('Вы вышли из профиля', 'success')
    return redirect(url_for('login'))


@app.route('/profile')
@login_required
def profile():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    id_user = current_user.get_id()
    return render_template("user/profile.html", authenticated = authenticated, result_test = dbase.getresults_test(id_user))


@app.route('/userava')
def userava():
    img = current_user.getAvatar(app)
    if not img:
        return ""
    h = make_response(img)
    h.headers['Content-Type'] = 'image/png'
    return h


@app.route('/getava/<id_user>', methods = ["GET", "POST"])
def getava(id_user):
    user1 = UserLogin().fromDB(id_user, dbase)
    img = user1.getAvatar(app)
    h = make_response(img)
    h.headers['Content-Type'] = 'image/png'
    return h


@app.route('/upload', methods = ["GET", "POST"])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        name = request.form['update_name']
        if not name:
            name = current_user.getName()
        if not file and len(name)>5:
            try:
                res = dbase.updateUserAvatar(None, current_user.get_id(), name)
                if not res:
                    flash('Ошибка обновления профиля', 'error')
                flash('Профиль обновлен', 'success')
            except FileNotFoundError as e:
                flash('Ошибка обновления профиля', 'error')
            return redirect(url_for('update_profile'))
        if file and current_user.verifyExt(file.filename):
            try:
                img = file.read()
                res = dbase.updateUserAvatar(img, current_user.get_id(), name)
                if not res:
                    flash('Ошибка обновления аватара', 'error')
                flash('Аватар обновлен', 'success')
            except FileNotFoundError as e:
                flash('Ошибка чтения файла', 'error')
        else:
            flash('Ошибка обновления автара', "error")

    return redirect(url_for('update_profile'))


@app.route('/update_profile')
@login_required
def update_profile():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
        return render_template("user/update_profile.html", authenticated = authenticated)


@app.route('/password_edit')
@login_required
def password_edit():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    form = Edit_Password()
    return render_template("user/password_edit.html", form=form, authenticated = authenticated)



@app.route('/psw_edit', methods = ["GET", "POST"])
def psw_edit():
    if request.method == 'POST':
        form = Edit_Password()
        if form.psw.data != form.psw2.data:
            flash('Новые пароли не совпадают', category='error')
            return redirect(url_for('password_edit'))
        if check_password_hash(current_user.get_psw(), request.form['old_psw']):
            if form.validate_on_submit():
                if check_password_hash(current_user.get_psw(), request.form['old_psw']):
                    hash = generate_password_hash(form.psw.data)
                    if form.psw.data == request.form['old_psw']:
                        flash('Новый пароль не может быть таким же, как старый', category='error')
                        return redirect(url_for('password_edit'))
                    res = dbase.password_edit(current_user.getEmail(), hash)
                    if res:
                        flash('Пароль успешно изменен', category='success')
                        return redirect(url_for('password_edit'))
                    else:
                        flash('Ошибка при изменении', category='error')
        else:
            flash('Вы ввели неверный старый пароль', category='error')
            return redirect(url_for('password_edit'))
    return redirect(url_for('password_edit'))

#АВТОРИЗАЦИЯ, РЕГИСТРАЦИЯ И РАБОТА С ПРОФИЛЕМ    КОНЕЦ-----------------------------------------------------


@app.route('/raiting')
@login_required
def raiting():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True

    return render_template("raiting.html",  authenticated = authenticated, users = dbase.getresults_test_forRaiting())



@app.route('/example')
def example():
    return render_template('example.html')


#Обработчики ошибок---------------------------------------------------------------------
@app.errorhandler(404)
def pageNotFound(error):
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    return render_template('errors/page404.html', authenticated = authenticated), 404


@app.errorhandler(500)
def internal_error(error):
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    return render_template('errors/page500.html', authenticated = authenticated), 500
#Обработчики ошибок  КОНЕЦ---------------------------------------------------------------------


#Марс---------------------------------------------------------------------
@app.route('/mars')
@login_required
def mars():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    return render_template("mars/mars.html",  authenticated = authenticated)


@app.route('/ekonomist', methods = ["GET", "POST"])
@login_required
def ekonomist():
    chek = dbase.check_resultTest(current_user.get_id(), "Офис экономики")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], 999)
            return render_template("mars/mars.html", authenticated=authenticated)

        return render_template("mars/ekonomist.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getTests(), authenticated=authenticated)



@app.route('/bezopasnik', methods = ["GET", "POST"])
@login_required
def bezopasnik():
    chek = dbase.check_resultTest(current_user.get_id(), "Офис cвязи с ракетой")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], 999)
            return render_template("mars/mars.html", title="Полет на Марс", authenticated=authenticated)

        return render_template("mars/bezopasnik.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getTests(), authenticated=authenticated)


@app.route('/HR_specialist', methods = ["GET", "POST"])
@login_required
def HR_specialist():
    chek = dbase.check_resultTest(current_user.get_id(), "HR-лаборатория")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], 999)
            return render_template("mars/mars.html", title="Полет на Марс", authenticated=authenticated)

        return render_template("mars/HR_specialist.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getTests(), authenticated=authenticated)


@app.route('/inzener_konstruktor', methods = ["GET", "POST"])
@login_required
def inzener_konstruktor():
    chek = dbase.check_resultTest(current_user.get_id(), "Инженер-Конструктор")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], 999)
            return render_template("mars/mars.html", title="Полет на Марс", authenticated=authenticated)

        return render_template("mars/inzener_konstruktor.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getTests(), authenticated=authenticated)
#Марс КОНЕЦ---------------------------------------------------------------------


#Страницы тестов-----------------------------------------------------
@app.route('/tests')
@login_required
def tests():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    id_user = current_user.get_id()
    return render_template("tests/tests.html", test_not_finish=dbase.getTest_not_finish(id_user), test_finish= dbase.getTest_finish(id_user), authenticated = authenticated)



@app.route('/test_liderPotenzial', methods = ["GET", "POST"])
@login_required
def test_liderPotenzial():
    chek = dbase.check_resultTest(current_user.get_id(), "Тест на лидерский потенциал")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
                id_test = dbase.getID_test(request.form['name_test'])
                res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test[0])
                return redirect('profile')

        return render_template("tests/test_liderPotenzial.html", tests = dbase.getTests(), authenticated = authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getTests(), authenticated=authenticated)



@app.route('/aizek_temperament', methods = ["GET", "POST"])
@login_required
def aizek_temperament():
    chek = dbase.check_resultTest(current_user.get_id(), "Айзенк «Личностный опросник»")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            id_test = dbase.getID_test(request.form['name_test'])
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test)
            return redirect('profile')
        return render_template("tests/aizek_temperament.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getTests(), authenticated=authenticated)



@app.route('/kettel', methods = ["GET", "POST"])
@login_required
def kettel():
    chek = dbase.check_resultTest(current_user.get_id(), "Опросник Кеттелла для подростков")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            id_test = dbase.getID_test(request.form['name_test'])
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test)
            return redirect('profile')
        return render_template("tests/kettel.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getTests(), authenticated=authenticated)



@app.route('/proforient', methods = ["GET", "POST"])
@login_required
def proforient():
    chek = dbase.check_resultTest(current_user.get_id(), "Тест на профориентацию по методике академика Е.А. Климова")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            id_test = dbase.getID_test(request.form['name_test'])
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test)
            return redirect('profile')
        return render_template("tests/proforient.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getTests(), authenticated=authenticated)



@app.route('/type_thinking', methods = ["GET", "POST"])
@login_required
def type_thinking():
    chek = dbase.check_resultTest(current_user.get_id(), "Методика «Тип мышления» (методика в модификации Г. Резапкиной)")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            id_test = dbase.getID_test(request.form['name_test'])
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test)
            return redirect('profile')
        return render_template("tests/type_thinking.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getTests(), authenticated=authenticated)


@app.route('/method_profile', methods = ["GET", "POST"])
@login_required
def method_profile():
    chek = dbase.check_resultTest(current_user.get_id(), "Методика «Профиль» (методика карты интересов А. Голомштока в модификации Г. Резапкиной)")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            id_test = dbase.getID_test(request.form['name_test'])
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test)
            return redirect('profile')
        return render_template("tests/method_profile.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/test.html", tests=dbase.getTests(), authenticated=authenticated)



@app.route('/proffessional_inclination', methods = ["GET", "POST"])
@login_required
def proffessional_inclination():
    chek = dbase.check_resultTest(current_user.get_id(), "Опросник профессиональных склонностей (методика Л. Йовайши в модификации Г. Резапкиной)")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            id_test = dbase.getID_test(request.form['name_test'])
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'], id_test)
            print(request.form['result'])
            return redirect('profile')
        return render_template("tests/proffessional_inclination.html", tests=dbase.getTests(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/test.html", tests=dbase.getTests(), authenticated=authenticated)
#Страницы тестов КОНЕЦ-----------------------------------------------------


if __name__=='__main__':
    app.run()
