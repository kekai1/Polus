from flask import Flask, render_template, url_for, request, flash, redirect, make_response, send_file
import os
from FDataBase import FDataBase
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from UserLogin import UserLogin
from forms import LoginForm, RegisterForm, MessageForm
from flaskext.mysql import MySQL
from admin.admin import admin



SECRET_KEY = os.urandom(32)
MAX_CONTENT_LENGTH = 1024 * 1024

#Конфигурационные настройки проекта, и связь с БД-----------------------------------------------
app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'asdqweasdqwe1'
app.config['MYSQL_DATABASE_DB'] = 'bucketlist'
app.config['CLEARDB_DATABASE_URL'] = 'mysql://bafce1efb1c421:b9e81c99@eu-cdbr-west-01.cleardb.com/heroku_6237bfc1dff5be7?reconnect=true'
app.config['SECRET_KEY'] = SECRET_KEY
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
dbase = None
@app.before_request
def before_request():
    """Устанавливаем соединение с БД перед выполнением запроса"""
    global dbase
    db = mysql.connect()
    dbase = FDataBase(db)





#Страницы тестов-----------------------------------------------------
@app.route('/tests')
@login_required
def tests():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True

    return render_template("tests/tests.html", tests = dbase.getPostsAnonce(), authenticated = authenticated)



@app.route('/test_liderPotenzial', methods = ["GET", "POST"])
@login_required
def test_liderPotenzial():
    chek = dbase.check_resultTest(current_user.get_id(), "Тест на лидерский потенциал")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
                res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'])
                return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)

        return render_template("tests/test_liderPotenzial.html", tests = dbase.getPostsAnonce(), authenticated = authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)



@app.route('/aizek_temperament', methods = ["GET", "POST"])
@login_required
def aizek_temperament():
    chek = dbase.check_resultTest(current_user.get_id(), "Айзенк «Личностный опросник»")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'])
            return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)

        return render_template("tests/aizek_temperament.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)



@app.route('/kettel', methods = ["GET", "POST"])
@login_required
def kettel():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'])
            return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)

    return render_template("tests/kettel.html", tests = dbase.getPostsAnonce(), authenticated = authenticated)



@app.route('/proforient', methods = ["GET", "POST"])
@login_required
def proforient():
    chek = dbase.check_resultTest(current_user.get_id(), "Тест на профориентацию")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['id_user'], request.form['result'])
            return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)

        return render_template("tests/proforient.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
    else:
        flash('Вы уже проходили данный тест, пожалуйста, попробуйте выбрать другой.', category='error')
        return render_template("tests/tests.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
#Страницы тестов КОНЕЦ-----------------------------------------------------




@app.route('/')
def index():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    return render_template("index.html", authenticated = authenticated)


@app.route("/add_post", methods = ["GET", "POST"])
@login_required
def addPost():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if request.method == "POST":
        if len(request.form['name']) > 4 and len(request.form['post']) > 10:
            res = dbase.addPost(request.form['name'], request.form['post'], request.form['url'])
            if not res:
                flash('Ошибка добавления статьи', category = 'error')
            else:
                flash('Статья добавлена успешно', category = 'success')
        else:
            flash('Ошибка добавления статьи', category = 'error')

    return render_template("add_post.html", authenticated = authenticated)


#АВТОРИЗАЦИЯ, РЕГИСТРАЦИЯ И РАБОТА С ПРОФИЛЕМ-----------------------------------------------------
@app.route('/login', methods = ["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('profile'))

    form = LoginForm()
    if form.validate_on_submit():
        user = dbase.getUserByEmail(form.email.data)
        if user and check_password_hash(user[3], form.psw.data):
            userlogin = UserLogin().create(user)
            rm = form.remember.data
            login_user(userlogin, remember=rm)
            return redirect(request.args.get("next") or url_for('profile'))
        flash('Неверные логин или пароль', 'error')
    return render_template("user/login.html", form = form,  title=1)



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
                flash('Вы успешно зарегистрированны', category='success')
                return redirect(url_for('login'))
            else:
                flash('Ошибка при добавлении', category='error')
    return render_template("user/register.html", form=form, title=1)


@app.route('/logout')
def logout():
    logout_user()
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
#АВТОРИЗАЦИЯ, РЕГИСТРАЦИЯ И РАБОТА С ПРОФИЛЕМ    КОНЕЦ-----------------------------------------------------


@app.route('/raiting')
@login_required
def raiting():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True

    return render_template("raiting.html",  authenticated = authenticated, users = dbase.getresults_test_forRaiting())



@app.route('/messages', methods=['GET', 'POST'])
@login_required
def messages():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True

    form = MessageForm()
    if form.validate_on_submit():
        msg = dbase.add_message(request.form['id_sender'], request.form['id_receptient'], request.form['body'])
        flash('Сообщение отправлено!', category = 'success')
    return render_template('messages.html', form=form, authenticated = authenticated)


@app.route('/example')
def example():
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    form = RegisterForm()
    return render_template('example.html', title=1, form=form, authenticated = authenticated)


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
            res = dbase.Addresults_test(request.form['name_test'], request.form['user_id'], request.form['result'])
            return render_template("mars/mars.html", authenticated=authenticated)

        return render_template("mars/ekonomist.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)



@app.route('/bezopasnik', methods = ["GET", "POST"])
@login_required
def bezopasnik():
    chek = dbase.check_resultTest(current_user.get_id(), "Офис cвязи с ракетой")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['user_id'], request.form['result'])
            return render_template("mars/mars.html", title="Полет на Марс", authenticated=authenticated)

        return render_template("mars/bezopasnik.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)


@app.route('/HR_specialist', methods = ["GET", "POST"])
@login_required
def HR_specialist():
    chek = dbase.check_resultTest(current_user.get_id(), "HR-лаборатория")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['user_id'], request.form['result'])
            return render_template("mars/mars.html", title="Полет на Марс", authenticated=authenticated)

        return render_template("mars/HR_specialist.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)


@app.route('/inzener_konstruktor', methods = ["GET", "POST"])
@login_required
def inzener_konstruktor():
    chek = dbase.check_resultTest(current_user.get_id(), "Инженер-Конструктор")
    authenticated = False
    if current_user.is_authenticated:
        authenticated = True
    if chek:
        if request.method == "POST":
            res = dbase.Addresults_test(request.form['name_test'], request.form['user_id'], request.form['result'])
            return render_template("mars/mars.html", title="Полет на Марс", authenticated=authenticated)

        return render_template("mars/inzener_konstruktor.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
    else:
        flash('Вы уже были в данной лаборатории, пожалуйста, попробуйте выбрать другую.', category='error')
        return render_template("mars/mars.html", tests=dbase.getPostsAnonce(), authenticated=authenticated)
#Марс КОНЕЦ---------------------------------------------------------------------








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


if __name__=='__main__':
    app.run(debug=True)