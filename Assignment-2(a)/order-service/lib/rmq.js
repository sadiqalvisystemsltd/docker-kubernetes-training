const amqp = require('amqplib');
const DATA_SERVICE_QUEUE_NAME = "dataservice";
const WEBHOOK_QUEUE_NAME = "webhook";
const AMPQ_URL = "amqp://guest:guest@rabbitmq:5672"
const sendMsg = async (queueName, message) => {
  let connection;
  try {
    connection = await amqp.connect(AMPQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(" [x] Sent '%s'", message);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
};

const receiveMsg = async (queueName) => {
  try {
    const connection = await amqp.connect(AMPQ_URL);
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queueName, { durable: false });
    await channel.consume(
      queueName,
      (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            JSON.parse(message.content.toString())
          );
          if(queueName == DATA_SERVICE_QUEUE_NAME) {
              sendMsg(WEBHOOK_QUEUE_NAME, message);
          }
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
};
module.exports = {
  sendMsg, receiveMsg
};
