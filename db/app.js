const express = require("express");
const { getTopics, getAPI } = require("../db/controllers");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAPI);

module.exports = app;
