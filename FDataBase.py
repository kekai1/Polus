import sqlite3

class FDataBase:
    def __init__(self, db):
        self.__db =db
        self.__cur = db.cursor()

    def getMenu(self):
        sql = '''SELECT * FROM users'''
        try:
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except:
            print("Ошибка чтения из БД")
        return []


    def addUser(self, name, email, hpsw):
        try:
            self.__cur.execute(f"SELECT COUNT(*) AS 'count' FROM users WHERE email_user like '{email}'")
            res = self.__cur.fetchone()
            print(res)
            if res[0] != 0:
                print('Пользователь с таким email уже существует')
                return False
            self.__cur.execute("INSERT INTO users(name_user, email_user, psw_user) VALUES (%s, %s, %s)", (name, email, hpsw))
            self.__db.commit()
        except sqlite3.Error as e:
            print("Ошибка в БД, или Пользователь с таким email уже существует " + str(e))
        return True


    #Так как браузер смотрит с каким пользователем работаем по id то проверяем пользователя по id
    def getUser(self, id_user):
        try:
            self.__cur.execute(f"SELECT * FROM users WHERE id_user = {id_user} LIMIT 1")
            res = self.__cur.fetchone()
            if not res:
                print('Такой пользователь не найден')
                return False
            return res

        except sqlite3.Error as e:
            print("Ошибка в БД " + str(e))
        return False



    def getUserByEmail(self, email):
        try:
            self.__cur.execute(f"SELECT * FROM users WHERE email_user = '{email}' LIMIT 1")
            res = self.__cur.fetchone()
            if not res:
                print('Пользователь не найден')
                return False
            return res
        except sqlite3.Error as e:
            print("Ошибка в БД " + str(e))

        return False



    def updateUserAvatar(self, avatar, id_user, name):
        if not avatar:
            try:
                self.__cur.execute("UPDATE users SET name_user = %s WHERE id_user = %s", (name, id_user))
                self.__db.commit()
            except sqlite3.Error as e:
                print('Ошибка обновления профиля: ', + str(e))
                return False
        else:
            try:
                self.__cur.execute("UPDATE users SET avatar_user = %s, name_user = %s WHERE id_user = %s", (avatar, name, id_user))
                self.__db.commit()
            except sqlite3.Error as e:
                print('Ошибка обновления автара в БД: ', + str(e))
                return False
        return True


    def email_confirmedUser(self, id_user, email_confirmed):
        try:
            self.__cur.execute("UPDATE users SET email_confirmed = %s WHERE id_user = %s", (email_confirmed, id_user))
            self.__db.commit()
        except sqlite3.Error as e:
            print('Ошибка обновления автара в БД: ', + str(e))
            return False
        return True


    def password_edit(self, email, password):
        try:
            self.__cur.execute("UPDATE users SET psw_user = %s WHERE email_user = %s", (password, email))
            self.__db.commit()
        except sqlite3.Error as e:
            print('Ошибка обновления автара в БД: ', + str(e))
            return False
        return True



    ###РАБОТА С ТЕСТАМИ---------------------------------------------------------------------------------

    def getID_test(self, name_test):
        try:
            self.__cur.execute(f"SELECT id_test FROM tests WHERE title_test = '{name_test}'")
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print("Error insert article in Database " + str(e))
        return []


    def Addresults_test(self, name_test, id_user, result, id_test):
        try:
            if result == '': return False
            self.__cur.execute(f"INSERT INTO result_test(name_test, id_test, id_user, result) VALUES(%s, %s, %s, %s)", (name_test, id_test, id_user, result))
            self.__db.commit()
        except sqlite3.Error as e:
            print("Ошибка в БД " + str(e))
        return True


    def getresults_test(self, id_user):
        try:
            self.__cur.execute(f"SELECT * FROM result_test WHERE id_user = {id_user} ORDER BY test_date DESC")
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print("Error insert article in Database "+str(e))
        return []



    def getresults_test_forRaiting(self):
        try:
            self.__cur.execute(f"SELECT users.name_user AS 'name', users.id_user, COUNT(result_test.id_user)*5 AS 'raiting' FROM result_test, users WHERE result_test.id_user=users.id_user GROUP BY name ORDER BY raiting DESC")
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print("Error insert article in Database "+str(e))
        return []



    def check_resultTest(self, id_user, name_test):
        try:
            self.__cur.execute(f"SELECT * FROM result_test WHERE id_user = '{id_user}' AND name_test = '{name_test}'")
            res = self.__cur.fetchone()
            if res == None:
                return True
            if len(res) > 0:
                print('Вы уже проходили этот тест')
                return False
            return True
        except sqlite3.Error as e:
            print("Ошибка в БД " + str(e))
        return True


    def getTests(self):
        try:
            self.__cur.execute(f"SELECT id_test, title_test, text_test, url FROM tests")
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print("Error insert article in Database "+str(e))
        return []


    def getTest_finish(self, id_user):
        try:
            self.__cur.execute(f"SELECT * FROM tests WHERE id_test in (SELECT id_test FROM result_test WHERE id_user = '{id_user}')")
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print("Error insert article in Database "+str(e))
        return []


    def getTest_not_finish(self, id_user):
        try:
            self.__cur.execute(f"SELECT * FROM tests WHERE id_test not in (SELECT id_test FROM result_test WHERE id_user = '{id_user}')")
            res = self.__cur.fetchall()
            if res: return res
        except sqlite3.Error as e:
            print("Error insert article in Database "+str(e))
        return []

    ###РАБОТА С ТЕСТАМИ КОНЕЦ---------------------------------------------------------------------------------
