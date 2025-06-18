export default async function globalTeardown(): Promise<void> {
  await (global as any).__MONGO_MEMORY_SERVER_INSTANCE__.stop();
}
