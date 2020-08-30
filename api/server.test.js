const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

let token = null;

describe("server", function () {
  it("should run the tests", function () {
    expect(true).toBe(true);
  });
});

describe("/api/login", function () {
  beforeEach(async () => {
    await db("users").truncate();
    await db("tech").truncate();
    await request(server).post("/api/signup").send({
      username: "usertest",
      password: "testpw",
      firstName: "jest",
      lastName: "tester",
    });
  });

  it("should respond with status 200", function () {
    return request(server)
      .post("/api/login")
      .send({
        username: "usertest",
        password: "testpw",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("should respond with message welcome to our api", function () {
    return request(server)
      .post("/api/login")
      .send({
        username: "usertest",
        password: "testpw",
      })
      .then((res) => {
        expect(res.body.message).toBe(
          "Welcome to our API, you are now logged in!"
        );
      });
  });

  it("should respond with status 400", function () {
    return request(server)
      .post("/api/login")
      .send({
        username: "usertest",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  it("should respond with message invalid credentials", function () {
    return request(server)
      .post("/api/login")
      .send({
        username: "usertest",
        password: "testpw123",
      })
      .then((res) => {
        expect(res.body.message).toBe("Invalid username or password");
      });
  });
});

describe("/api/signup", function () {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should respond with status 400", function () {
    return request(server)
      .post("/api/signup")
      .send({
        username: "jesttest",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  it("should respond with an err", function () {
    return request(server)
      .post("/api/signup")
      .send({
        username: "jesttest",
      })
      .then((res) => {
        token = res.body.token;
        expect(res.body.message).toBe("Please provide username and password.");
      });
  });
});
