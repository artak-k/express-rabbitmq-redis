import client, { Connection, Channel } from "amqplib";
import config from "./config";
import { generateHash } from "../utils/utils";

type HandlerCB = (msg: string, correlationId: string) => any;

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;
  constructor() {
    this.connected = false;
  }
  private async ensureConnection() {
    if (this.connected && this.channel) return;

    try {
      console.log("⌛️ Connecting to Rabbit-MQ Server");
      this.connection = await client.connect(config.rmqUri);
      this.channel = await this.connection.createChannel();

      console.log("✅ Rabbit MQ Connection is ready");
      console.log("🛸 Created RabbitMQ Channel successfully");

      this.connected = true;
    } catch (error) {
      console.error("Error while connecting to RabbitMQ:", error);
      throw new Error("Failed to connect to RabbitMQ server");
    }
  }

  async sendToQueue(queue: string, msg: any, correlationId: string) {
    await this.ensureConnection()

    try {
      await this.channel.assertQueue('', { exclusive: true });
      const data = { data: msg };
      const messageString = JSON.stringify(data);
      const hash = generateHash(messageString);
      const messageWithHash = { message: data, hash };
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageWithHash)), {
        correlationId: correlationId,
        headers: {
          customQueue: queue === config.NOTIFICATION_QUEUE.task ? config.NOTIFICATION_QUEUE.taskResponse : config.NOTIFICATION_QUEUE.response

        }
      });

    } catch (error) {
      console.error("Error while sending to queue:", error);
      throw error;
    }
  }

  async consume(queue: string, incomingNotificationHandler: HandlerCB) {
    await this.ensureConnection()

    try {
      await this.channel.assertQueue(queue, {
        durable: true,
      });
      this.channel.prefetch(1);

      this.channel.consume(
        queue,
        async (msg) => {
          if (!msg) {
            console.error(`Invalid incoming message`);
            return;
          }
          const { message, hash } = JSON.parse(msg.content.toString());
          const messageString = JSON.stringify(message);
          const computedHash = generateHash(messageString);
          if (computedHash === hash) {
            console.log('Message verified:', message);
            await incomingNotificationHandler(msg?.content?.toString(), msg.properties.correlationId);

          } else {
            console.error('Hash mismatch! Possible data corruption.');
          }

          this.channel.ack(msg);

        },
        {
          noAck: false,
        }
      );
    } catch (error: any) {
      console.error("Error while consuming message:", error.message);
    }
  }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;