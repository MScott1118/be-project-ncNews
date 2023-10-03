const express = require("express");
const { getTopics, getAPI, getArticleByID } = require("../db/controllers");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAPI);

app.get("/api/articles/:article_id", getArticleByID);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ msg: "Invalid article ID" });
});
module.exports = app;
