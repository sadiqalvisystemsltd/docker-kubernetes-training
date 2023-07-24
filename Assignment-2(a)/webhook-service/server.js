// imports
const express = require("express");
const morgan = require("morgan");
const amqp = require('amqplib');


const { receiveMsg } = require("./lib/rmq");

const WEBHOOK_QUEUE_NAME = "webhook";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

receiveMsg(WEBHOOK_QUEUE_NAME);

app.listen(5007);
