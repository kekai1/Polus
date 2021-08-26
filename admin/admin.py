from flask import Blueprint, render_template, url_for, redirect, session, request, flash, g
from .forms import LoginForm
admin = Blueprint('admin', __name__, template_folder='templates', static_folder='static')




def isLogged():
    return True if session.get('admin_logged') else False

def login_admin():
    session['admin_logged'] = 1

def logout_admin():
    session.pop('admin_logged', None)


db = None
@admin.before_request
def before_request():
    """Установление соединения с БД перед выполнением запроса"""
    global db
    db = g.get('link_db')

@admin.teardown_request
def teardown_request(request):
    global db
    db = None
    return request

@admin.route('/')
def index():
    if not isLogged():
        return redirect(url_for('.login'))

    return render_template('admin/company.html', title='Админ-панель')


@admin.route('/login', methods=["POST", "GET"])
def login():
    if isLogged():
        return redirect(url_for('.index'))

    form = LoginForm()
    if request.method == "POST":

        if form.user.data  == "admin" and form.psw.data == "54321":
            login_admin()
            return redirect(url_for('.index'))
        else:
            flash("Неверная пара логин/пароль", "error")

    return render_template('admin/login.html', title='Админ-панель', form = form)


@admin.route('/logout', methods=["POST", "GET"])
def logout():
    if not isLogged():
        return redirect(url_for('.login'))

    logout_admin()

    return redirect(url_for('.login'))