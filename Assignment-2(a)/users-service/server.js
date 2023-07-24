// imports
const express = require("express");
const morgan = require("morgan");

// init express app
const app = express();
const { sendMsg } = require("./lib/rmq");
const DATA_SERVICE_QUEUE_NAME = "dataservice";
// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ! USERS CRUD OPERATIONS
app.get("/users", (req, res) => {
  res.send("GET USERS");
});

app.post("/users", (req, res) => {
  sendMsg(DATA_SERVICE_QUEUE_NAME, JSON.stringify(req.body));
  res.send("POST USERS");
  
});

app.put("/users", (req, res) => {
  res.send("PUT USERS");
});

app.delete("/users", (req, res) => {
  res.send("DELETE USERS");
});

app.listen(5003, () => {
  console.log("Users service Started to listen on port 5003");
});
