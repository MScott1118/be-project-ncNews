# Northcoders News API

Must add a .env.test and .env.development file when cloning this project. Inside each file add PGDATABASE=(db_name_here).

db for test: nc_news_test
db for dev: nc_news

Live version link: https://nc-news-32mx.onrender.com/

Summary: A project that displays my understanding of node.js and postgres, showing that I can setup and develop a database as well as properly host and query that db as required... tbc

How to clone and set up:

1. Go to terminal and enter git clone https://github.com/MScott1118/be-project-ncNews
2. Enter code be-project-ncNews
3. Go to terminal within VS and enter npm i express, npm i dotenv, npm i pg and npm i supertest
4. Run npm run setup-dbs, npm run seed and then npm run test.

.env setup:

1. Create .gitignore file and enter .env.\*
2. Create .env.development and enter PGDATABASE=nc_news
3. Create .env.test and enter PGDATABASE=nc_news_test

Node.js version unsure...tbc
Postgres version unsure...tbc
