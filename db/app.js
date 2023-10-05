const express = require("express");
const {
  getTopics,
  getAPI,
  getArticleByID,
  getArticles,
  getArticleComments,
  postArticleComment,
  patchArticleByID,
} = require("../db/controllers");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAPI);

app.get("/api/articles/:article_id", getArticleByID);
app.use((err, req, res, next) => {
  res.status(404).send({ msg: "Incorrect article ID" });
});

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);
app.use((err, req, res, next) => {
  res.status(404).send({ msg: "Incorrect article ID" });
});

app.post("/api/articles/:article_id/comments", postArticleComment);
app.use((err, req, res, next) => {
  res.status(404).send({ msg: "Incorrect article ID" });
});

app.patch("/api/articles/:article_id", patchArticleByID);
app.use((err, req, res, next) => {
  res.status(404).send({ msg: "Incorrect article ID" });
});
module.exports = app;
