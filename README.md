    Задан объект, который состоит из ключей-строк и значений. 

    Ключи объекта заданы с учетом следующих правил

        Ключ может содержать только символы английского алфавита и/или цифры

        Ключ может быть разбит на несколько секций символом ".". Количество секций не ограничено

        Если секция содержит в себе другую секцию - другой ключ не может быть указан таким образом, чтобы эта же секция содержала значение. 
        Например,  объект не может содержать одновременно { "rest.photo.host": "http://example.com", "rest": 10}.

    Значение может быть типа: Boolean, Number, String, null

    Преобразовать заданный объект в новый объект, в котором ключи надо разбить на секции символом ".". Количество секций не ограничено.

Пример:

Задан объект:

var obj = {
  "database.host": "127.0.0.1",
  "database.user": "test",
  "database.password": "qwerty",
  "rest.photo.host": "127.0.0.2",
  "rest.users.host": "127.0.0.3",
  "rest.users.password": "p@ssw0rd",
  "baseUrl": "test.com",
  "limit": 10
};

Преобразованый объект:

{
  "database": {
    "host": "127.0.0.1",
    "user": "test",
    "password": "qwerty"
  },
  "rest": {
    "photo": {
      "host": "127.0.0.2"
    },
    "users": {
      "host": "127.0.0.3",
      "password": "p@ssw0rd"
    }
  },
  "baseUrl": "test.com",
  "limit": 10
}