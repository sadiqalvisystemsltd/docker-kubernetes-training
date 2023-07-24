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

// ! SHIPPING OPERATIONS
app.get("/shipping", (req, res) => {
  res.send("GET SHIPPING");
});

app.post("/shipping", (req, res) => {
  console.log("Calling Billing");
  fetch("http://billing-service:5006/billing/",{
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  sendMsg(DATA_SERVICE_QUEUE_NAME, JSON.stringify(req.body));
  res.send("POST SHIPPING");
});

app.put("/shipping", (req, res) => {
  res.send("PUT SHIPPING");
});

app.delete("/shipping", (req, res) => {
  res.send("DELETE SHIPPING");
});

app.listen(5009, () => {
  console.log("Shipping service Started to listen on port 5009");
});
