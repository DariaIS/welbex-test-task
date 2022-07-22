# welbex-test-task
# Тестовое задание web-программист (React.js)

[![Build Status](https://travis-ci.org/crsandeep/simple-react-full-stack.svg?branch=master)](https://travis-ci.org/crsandeep/simple-react-full-stack)

Я клонировала boilerplate, содержащий React, Node.js, Express и Webpack.
Вручную настроила TypeScript и PostgreSQL.

## Начало работы

```bash
# Клоирование репозитория
git clone https://github.com/DariaIS/welbex-test-task/

# Переход в директорию
cd welbex-test-task
```

## Настройка базы данных
Для работы с бд необходимо скачать PostgreSQL

```bash
# Вход в базу данных из папки с PostgreSQL, и ввод пароля
psql -U postgres

# Создание базы данных
create database welbex;

# Подключение к базе данных
\connect welbex;
```

В данном файле содержатся SQL запросы для создания и заполнения таблицы базы данных, которые необходимо выполнить после подключения к базе данных
```
.
└── src/                     
     └── server/            
         └── database.sql
```

## Сборка проекта

```bash
# Установка зависимостей
yarn (or npm install)

# Запуск всего проекта
yarn dev (or npm run dev)

# Запуск клиентской части
yarn build (or npm run build)

# Запуск серверной части
yarn start (or npm start)
```
