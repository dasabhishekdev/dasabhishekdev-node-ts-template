import amqp, { Connection, Channel } from "amqplib";

export default async (): Promise<{
  connection: Connection;
  channel: Channel;
}> => {
  const rabbitmqUrl = process.env.RABBITMQ_URL as string;
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  console.log("RabbitMQ connected successfully");
  return { connection, channel };
};
