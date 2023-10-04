const db = require("../db/connection");
const endpoints = require("../endpoints.json");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then((returnedTopics) => {
    return returnedTopics.rows;
  });
};

exports.fetchAPI = () => {
  return new Promise((res, rej) => {
    res(endpoints);
  });
};

exports.fetchArticleByID = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((returnedArticle) => {
      if (returnedArticle.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid article ID" });
      }
      return returnedArticle.rows;
    });
};
