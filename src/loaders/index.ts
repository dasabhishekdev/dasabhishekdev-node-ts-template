import {
  express_loader,
  mongo_loader,
  redis_loader,
  rabbitmq_loader,
  swagger_loader,
} from './all_loaders'; // centralized loader exports

export default async function initializeLoaders({ expressApp }) {
  // 1. Initialize MongoDB
  await mongo_loader();
  console.log('---- MongoDB Initialized ----');

  // 2. Initialize Express
  await express_loader({ app: expressApp });
  console.log('---- Express Initialized ----');

  // 3. Initialize Redis (if required)
  // await redis_loader();
  // console.log('---- Redis Initialized ----');

  // 4. Initialize RabbitMQ (if required)
  // await rabbitmq_loader();
  // console.log('---- RabbitMQ Initialized ----');

  swagger_loader({ app: expressApp });
  console.log('---- Swagger Initialized ----');
  console.log('---- All Loaders Completed ----');
}
