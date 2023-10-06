const request = require("supertest");
const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const endpoints = require("../endpoints.json");

beforeEach(() => {
  return seed(db);
});
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("should respond with a 200 status code", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("should return an array of all topic objects with correct keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics.length).toBe(3);
        expect(Array.isArray(res.body.topics)).toBe(true);
        res.body.topics.forEach((topics) => {
          expect(typeof topics.slug).toBe("string");
          expect(typeof topics.description).toBe("string");
        });
      });
  });
});

describe("GET /api", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api").expect(200);
  });
  test("should return all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(typeof res.body.endpoints).toBe("object");
        expect(res.body.endpoints).toEqual(endpoints);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api/articles/1").expect(200);
  });
  test("should return an object with the correct article with correct keys", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toMatchObject([
          {
            article_id: 1,
            title: "Running a Node App",
            topic: "coding",
            author: "jessjelly",
            body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            created_at: "2020-11-07T06:03:00.000Z",
            votes: 0,
            article_img_url:
              "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
          },
        ]);
      });
  });
  test("should return 404 error when passed an article id that doesn't exist", () => {
    return request(app).get("/api/articles/40").expect(404);
  });
});

describe("GET /api/articles", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test("should return an array of all article objects with the correct keys", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles.length).toBe(36);
        expect(Array.isArray(res.body.articles)).toBe(true);
        res.body.articles.forEach((article) => {
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api/articles/1/comments").expect(200);
  });
  test("should return an array of all comment objects with correct keys", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.comments)).toBe(true);
        res.body.comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });
  test("should return 404 error when passed an article id that doesn't exist", () => {
    return request(app).get("/api/articles/40/comments").expect(404);
  });
  // test("should return an empty array if there are no comments", () => {
  // there are no articles with no comments
  test("should return 400 error if passed an invalid article ID", () => {
    return request(app).get("/api/articles/potato/comments").expect(400);
  });
});

describe("POST /api/articles/:aritcle_id/comments", () => {
  test("should return a 201 status code", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "jessjelly",
        body: "Great article!",
      })
      .expect(201);
  });
  test("should return the new comment object with the correct keys", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "jessjelly",
        body: "Great article!",
      })
      .then((res) => {
        expect(Array.isArray(res.body.comment)).toBe(true);
        expect(typeof res.body.comment[0].comment_id).toBe("number");
        expect(typeof res.body.comment[0].votes).toBe("number");
        expect(typeof res.body.comment[0].created_at).toBe("string");
        expect(typeof res.body.comment[0].author).toBe("string");
        expect(typeof res.body.comment[0].body).toBe("string");
        expect(res.body.comment[0].article_id).toBe(1);
      });
  });
  test("should return 404 error when passed an article id that doesn't exist", () => {
    return request(app)
      .post("/api/articles/40/comments")
      .send({
        username: "jessjelly",
        body: "Great article!",
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Incorrect article ID");
      });
  });
  test("should return 400 error if passed an invalid article ID", () => {
    return request(app)
      .post("/api/articles/potato/comments")
      .send({
        username: "jessjelly",
        body: "Great article!",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid article ID");
      });
  });
  test(`should return 404 error if passed a username that doesn't exist`, () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "MichaelScott24",
        body: "Great article!",
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Username not found");
      });
  });
  test("should return 400 error if no body is passed", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "jessjelly",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("No body property on request");
      });
  });
});

describe("PATCH /api/aritcles/:article_id", () => {
  test("should return a 200 status code", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 1,
      })
      .expect(200);
  });
  test("should return the new article object with the correct keys and updated values", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 1,
      })
      .then((res) => {
        expect(res.body.article[0]).toEqual({
          article_id: 1,
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: "2020-11-07T06:03:00.000Z",
          votes: 1,
          article_img_url:
            "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
        });
      });
  });
  test("should return a 404 status code when passed an incorrect article id", () => {
    return request(app)
      .patch("/api/articles/40")
      .send({
        inc_votes: 1,
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Incorrect article ID");
      });
  });
  test("should return 400 status code when passed an invalid article ID", () => {
    return request(app)
      .patch("/api/articles/potato")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid article ID");
      });
  });
  test("should return 400 status code when passed no body", () => {
    return request(app)
      .patch("/api/articles/potato")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid article ID");
      });
  });
  test("should ignore any other properties on the request body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 1,
        example: "example",
      })
      .then((res) => {
        expect(res.body.article[0]).toEqual({
          article_id: 1,
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: "2020-11-07T06:03:00.000Z",
          votes: 1,
          article_img_url:
            "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("should return 204 status code", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test(`should return a 404 status code when passed a comment id that doesn't exist`, () => {
    return request(app).delete("/api/comments/9999").expect(404);
  });
  test("should return 400 error if passed an invalid comment ID", () => {
    return request(app).delete("/api/comments/banana").expect(400);
  });
});

describe("GET /api/users", () => {
  test("Should return 200 status code", () => {
    return request(app).get("/api/users").expect(200);
  });
  test("should return an array of all user objects with correct keys", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(res.body.users.length).toBe(6);
        expect(Array.isArray(res.body.users)).toBe(true);
        res.body.users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});
