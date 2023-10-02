const { fetchTopics, fetchAPI } = require("./models");

exports.getTopics = (req, res) => {
  return fetchTopics().then((returnedTopics) => {
    return res.status(200).send({ topics: returnedTopics });
  });
};

exports.getAPI = (req, res) => {
  return fetchAPI().then((returnedEndpoints) => {
    // console.log(returnedEndpoints);
    return res.status(200).send({ endpoints: returnedEndpoints });
  });
};
