import express, { Application } from 'express';
import config from './config/config';
import { adminRouter } from './modules/admin/admin.router';
import { Notification } from './utils/notification';
import mqConnection from './config/rabbitmq.config';
import redisCache from './config/cache.config';
import { taskRouter } from './modules/task/task.router';
// import { startTests } from './test';

(async (app: Application, port: number) => {
  app.use(express.json())
  app.use("/", adminRouter);
  app.use("/", taskRouter);

  app.listen(port, () => {
    console.log(`✅ Server is running on ${config.SERVER_URI}`);
  });
  redisCache.init();

  await startConsumers()
  // await startTests()
})(express(), config.PORT)

async function startConsumers() {
  try {
    await mqConnection.consume(config.NOTIFICATION_QUEUE.response, Notification.get);
    await mqConnection.consume(config.NOTIFICATION_QUEUE.taskResponse, Notification.get);
  } catch (error: any) {
    console.error(`Error occurred while starting consumers: ${error.message}`, error);
  }
}