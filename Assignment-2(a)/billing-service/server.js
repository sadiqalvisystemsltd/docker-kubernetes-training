// imports
const express = require("express");
const morgan = require("morgan");

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

const { sendMsg } = require("./lib/rmq");
const DATA_SERVICE_QUEUE_NAME = "dataservice";

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ! BILLING OPERATIONS
app.get("/billing", (req, res) => {
  res.send("GET BILLING");
});

app.post("/billing", (req, res) => {
  console.log(`Request Receivied in billing ${JSON.stringify(req.body)}`);
  sendMsg(DATA_SERVICE_QUEUE_NAME, JSON.stringify(req.body));
  res.send("POST BILLING");
});

app.put("/billing", (req, res) => {
  res.send("PUT BILLING");
});

app.delete("/billing", (req, res) => {
  res.send("DELETE BILLING");
});

app.listen(5006, () => {
  console.log("Billing service Started to listen on port 5006");
});
