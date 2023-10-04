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
        let count = 0;
        expect(Array.isArray(res.body.topics)).toBe(true);
        res.body.topics.forEach((topics) => {
          count++;
          expect(typeof topics.slug).toBe("string");
          expect(typeof topics.description).toBe("string");
        });
        expect(count).toBe(3);
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

describe("GET /api/article/:article_id", () => {
  test("should return a 200 status code", () => {
    return request(app).get("/api/articles/1").expect(200);
  });
  test("should return an object with the correct article with correct keys", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(typeof res.body.article).toBe("object");
        expect(typeof res.body.article[0].title).toBe("string");
        expect(typeof res.body.article[0].topic).toBe("string");
        expect(typeof res.body.article[0].author).toBe("string");
        expect(typeof res.body.article[0].created_at).toBe("string");
        expect(typeof res.body.article[0].votes).toBe("number");
        expect(typeof res.body.article[0].article_img_url).toBe("string");
        expect(typeof res.body.article[0].article_id).toBe("number");
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
        let count = 0;
        expect(Array.isArray(res.body.article)).toBe(true);
        res.body.article.forEach((article) => {
          count++;
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.comment_count).toBe("string");
        });
        expect(count).toBe(36);
      });
  });
});
