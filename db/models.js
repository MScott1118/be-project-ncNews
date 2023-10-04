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

exports.fetchArticles = () => {
  return db
    .query(
      `SELECT 
      a.article_id, 
      a.author, 
      a.title, 
      a.topic, 
      a.created_at, 
      a.votes, 
      a.article_img_url, 
      COUNT(c.article_id = a.article_id) AS comment_count
      FROM articles AS a
        INNER JOIN comments AS c ON a.article_id = c.article_id
      GROUP BY a.article_id
      ORDER BY a.created_at
  `
    )
    .then((returnedArticles) => {
      return returnedArticles.rows;
    });
};
