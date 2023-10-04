const {
  fetchTopics,
  fetchAPI,
  fetchArticleByID,
  fetchArticles,
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
