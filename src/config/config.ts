import { generateUuid } from "../utils/utils";
import { config } from "dotenv";

config();

const rmqUser = String(process.env.RABBITMQ_USERNAME) || 'guest';
const rmqPass = String(process.env.RABBITMQ_PASSWORD) || 'guest';
const rmqHost = String(process.env.RABBITMQ_URL);
const rmqPort = Number(process.env.RABBITMQ_PORT || 5672)
const rmqUri = `amqp://${rmqUser}:${rmqPass}@${rmqHost}:${rmqPort}`;

const SERVER_HOST = String(process.env.SERVER_HOST);
const TOKEN = String(process.env.TOKEN);
const PORT = Number(process.env.PORT || 3002);
const SERVER_URI = `http://localhost:${PORT}`
const NOTIFICATION_QUEUE = {
    request: '@request',
    response: '@' + generateUuid(),
    taskResponse: '@' + generateUuid(),
    task: '@task'
};

export default {
    rmqUri,
    NOTIFICATION_QUEUE,
    TOKEN,
    PORT,
    SERVER_HOST,
    SERVER_URI
}