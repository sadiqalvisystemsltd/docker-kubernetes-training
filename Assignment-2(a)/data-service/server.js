// imports
const express = require("express");
const morgan = require("morgan");
const amqp = require('amqplib');


const { receiveMsg } = require("./lib/rmq");

const DATA_SERVICE_QUEUE_NAME = "dataservice";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

receiveMsg(DATA_SERVICE_QUEUE_NAME);

app.listen(5008);
