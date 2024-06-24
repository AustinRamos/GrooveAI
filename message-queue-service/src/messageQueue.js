const amqp = require('amqplib');

const sendMessage = async (queue, message) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent %s", message);
    setTimeout(() => {
        connection.close();
    }, 500);
};

module.exports = { sendMessage };
