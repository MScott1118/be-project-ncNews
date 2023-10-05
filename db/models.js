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

exports.fetchArticleComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
    .then((returnedComments) => {
      if (returnedComments.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Incorrect article ID" });
      }
      return returnedComments.rows;
    });
};

exports.insertComment = (article_id, newComment, res) => {
  const body = newComment.body;
  const username = newComment.username;
  const allUsernames = Promise.resolve(db.query(`SELECT username FROM users;`));
  allUsernames.then((value) => {
    count = 0;
    value.rows.forEach((element) => {
      if (element.username === username) {
        count++;
      }
    });
    if (count === 0) {
      res.status(404).send({ msg: "Username not found" });
    }
    if (body === undefined) {
      res.status(400).send({ msg: "No body property on request" });
    }
  });
  return db.query(
    `INSERT INTO comments (body, author, article_id)
  VALUES ($1, $2, $3)
  RETURNING *`,
    [body, username, article_id]
  );
};
