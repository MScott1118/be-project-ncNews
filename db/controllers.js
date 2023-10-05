const {
  fetchTopics,
  fetchAPI,
  fetchArticleByID,
  fetchArticles,
  fetchArticleComments,
  insertComment,
} = require("./models");

exports.getTopics = (req, res) => {
  return fetchTopics().then((returnedTopics) => {
    return res.status(200).send({ topics: returnedTopics });
  });
};

exports.getAPI = (req, res) => {
  return fetchAPI().then((returnedEndpoints) => {
    return res.status(200).send({ endpoints: returnedEndpoints });
  });
};

exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  return fetchArticleByID(article_id)
    .then((returnedArticle) => {
      return res.status(200).send({ article: returnedArticle });
    })
    .catch(next);
};

exports.getArticles = (req, res) => {
  return fetchArticles().then((returnedArticles) => {
    return res.status(200).send({ article: returnedArticles });
  });
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  if (/[^0-9]/.test(article_id)) {
    return res.status(400).send({ msg: "Invalid article ID" });
  }
  return fetchArticleComments(article_id)
    .then((returnedComments) => {
      return res.status(200).send({ comments: returnedComments });
    })
    .catch(next);
};

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  insertComment(article_id, newComment)
    .then((comment) => {
      res.status(201).send({ comment: comment.rows });
    })
    .catch(next);
};
