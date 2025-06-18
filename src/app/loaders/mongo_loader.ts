import mongoose from 'mongoose';

export default async (): Promise<any> => {
  const connection = await mongoose.connect(
    process.env.MONGO_CONNECTION_STRING as string,
    {
      authSource: 'admin',
    } as any,
  );
  console.log('MongoDB connected successfully');
  return connection.connection.db; // Return the database connection
};
