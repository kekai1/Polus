from flask_login import UserMixin
from flask import url_for

class UserLogin(UserMixin):
    def fromDB(self, id_user, db):
        self.__user = db.getUser(id_user)
        return self

    def create(self, user):
        self.__user = user
        return self

    def get_id(self):
        return str(self.__user[0])

    def get_psw(self):
        return str(self.__user[3])


    def getName(self):
        return self.__user[1] if self.__user else 'Без имени'

    def getEmail(self):
        return self.__user[2]

    def getDate(self):
        return self.__user[5]

    def getAvatar(self, app):
        img = None
        if not self.__user[4]:
            try:
                with app.open_resource(app.root_path + url_for('static', filename = 'images_html/profile/default.png'), "rb") as f:
                    img = f.read()
            except FileNotFoundError as e:
                print('Не найден аватар по умолчанию: ' + str(e))
        else:
            img = self.__user[4]
        return img



    def verifyExt(self, filename):
        ext = filename.rsplit('.', 1)[1]
        if ext == 'png' or ext == 'PNG':
            return True
        return False

