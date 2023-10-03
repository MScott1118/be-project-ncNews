const { fetchTopics, fetchAPI, fetchArticleByID } = require("./models");

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
      if (returnedArticle.length === 0) {
        return res.status(400).send({ msg: "Invalid article ID" });
      } else {
        return res.status(200).send({ article: returnedArticle });
      }
    })
    .catch(next);
};
