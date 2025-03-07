# Мини-лабораторная 2, осень 24
## О чём лаба?
Лаба про реализацию backend приложения без базы данных, которое обращается к сторонним сервисам по API с помощью HTTP запросов. Необходимо выбрать и выполнить один из трёх вариантов задания, описанных ниже.

## Первый вариант задания 
1. Реализовать собственное бэкенд-приложение на любом языке и любом фреймворке, в котором будет использоваться API внешнего сервиса. В приложении должно быть минимум 3 эндпоинта для реализации логики работы сервиса. Наличие БД не обязательно;
2. Задокументируйте запросы Вашего сервиса в Postman, прикрепите ссылку на workspace в readme.md;
3. Прописать в readme.md подробную инструкцию по разворачиванию и конфигурации приложения локально. Прописать в readme.md логику работы Вашего приложения. readme.md должен быть написан строго на английском языке.


## Второй вариант задания
1. Реализуйте логику построения социального графа для пользователя Github, основываясь на готовом fastAPI;
2. Задокументируйте запросы Вашего сервиса в Postman, прикрепите ссылку на workspace в readme.md;
3. Пропишите в readme.md логику изменений, которые Вы внесли в исходное приложение. readme.md должен быть написан строго на английском языке.
4. Добавьте минимум два собственных endpoint, которые будут участвовать в работе приложения;
5. Модифицируйте или замените существующий frontend. frontend может быть написан не только на JS. Это может быть, например, скрипт на python, который с помощью HTTP запроса будет обращаться к Вашему backend-приложению и строить визуализацию графа по полученным данным.


## Третий вариант задания
1. Модифицируйте существующее backend-приложение для работы с существующей реализацией frontend;
Существующая реализация frontend работает со следующими значениями из получаемого от backend ответа:
- login: имя пользователя
- followers: список фолловеров пользователя (могут содержать вложенные поля followers)
- avatar_url: картинка, которую отображать вместо квадратика
- size: размер иконки (можно модифицировать, основываясь на знаниях о пользователе)

Необходимо получить для каждого followera исходного пользователя всех его follower-ов и добавить их в ответ в соответствющие поля.

Необходимо вычислить значение size для каждого из пользователей(запрашиваемый пользователь, его фолловеры, и все фолловеры фолловеров, ...). Вычислять размер иконки можно на основании его активности в последнее время, количества репозиториев, других параметров.

2. Задокументируйте запросы Вашего сервиса в Postman, прикрепите ссылку на workspace в readme.md;

3. Добавьте минимум два собственных enpoint. Они могут не участвовать в логике frontend приложения, но должны быть задокументированы;

4. Пропишите в readme.md логику изменений, которые Вы внесли в исходное приложение. readme.md должен быть написан строго на английском языке;

## Материалы
* [Документация GitHub API](https://docs.github.com/en/rest/users/followers) (в коде используется запрос "List followers of a user")
* [Postman](https://www.postman.com/) (для генерации ссылки нажмите share для желаемого workspace и сгенерируйте JSON-ссылку)


## Запуск приложений из репозитория
* Склонируйте репозиторий
### Backend
* Создайте и **активируйте** виртуальное окружение для проекта 
* Пройдите в корень проекта и установите зависимости с помощью команды pip install -r requrements.txt
* Запустите в окружении main.py (Обратите внмание, что по умолчанию сервер должен подняться по адресу http://localhost:5000/, в противном случае дефолтный фронтенд не сможет найти его)
### Frontend
* Пройдите в папку frontend
* Установите зависимости с помощью команды npm install
* Запустите web сервер с помощью команды npm run start:dev. Сервер поднимется по адресу: http://localhost:9000/



### Настройка репозитория
Сделайте свою копию репозитория. Как это сделать, описано [тут](https://gist.github.com/0xjac/85097472043b697ab57ba1b1c7530274) или [тут](https://stackoverflow.com/questions/10065526/github-how-to-make-a-fork-of-public-repository-private). Или можно создать чистый репозиторий самостоятельно и залить код туда.

Если создаете приватный репозиторий, ответным письмом будет отправлен логин преподавателя, которого нужно добавить в коллабораторы.

### Отправка задания
Выполните задания, сохраните изменения, сделайте commit и push в свой репозиторий.

Напишите на почту apicourse@yandex.ru письмо с темой вида MiniLab224 ФИО группа с просьбой проверить работу. В письме должна быть ссылка на репозиторий с выполненной работой, проверяться будет версия, которая лежит в ветке main. В ветке main не должно быть файлов и папок с русскими названиями!

### Дедлайн
**Дедлайн:** 23:59 18/11/2024 (18 ноября).