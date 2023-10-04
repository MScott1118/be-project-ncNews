const {
  fetchTopics,
  fetchAPI,
  fetchArticleByID,
  fetchArticles,
  fetchArticleComments,
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
  return fetchArticleComments(article_id)
    .then((returnedComments) => {
      return res.status(200).send({ comments: returnedComments });
    })
    .catch(next);
};
