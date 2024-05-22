# Интерфейс приложения для учета сделок по торговым инструментам
*Разработана Frontend-часть проекта для отслеживания операций над фьючерсами на Московской бирже*
## Возможности:
- отображение краткой и подробной информации о сделке;
- группировка сделок по датам;
- фильтрация сделок по Ticker;
- архивирование сделок за прошедшие торговые недели;
- уведомление об открытых сделках.
## Стек технологий:
- React 18.2;
- Redux Toolkit 2.0;
- TanStack Query;
- React Router;
- React Bootstrap.
## Гайд по запуску:
1. Установите [Docker](https://www.docker.com/products/docker-desktop/) и [Docker Compose](https://docs.docker.com/compose/install/#installation-scenarios).
2. Запустите сервисы с помощью Docker Compose: `docker-compose up -d`.
4. Зайдите в контейнер MongoDB: `docker exec -it mongo bash`.
6. Используйте `mongoimport` внутри контейнера для заполнения Mongo данными:  
`mongoimport --host=localhost --port=27017 --db=finam-robot --collection=deal --file=data.json`.
