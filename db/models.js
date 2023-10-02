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
