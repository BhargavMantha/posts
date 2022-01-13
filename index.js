const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: posts[id]
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type } = req.body;
  console.log("received event", type);
  res.send({});
});
app.listen(4000, () => {
  console.log("listening on port 4000");
});
