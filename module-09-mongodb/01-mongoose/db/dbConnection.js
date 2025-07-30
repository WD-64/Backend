import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'blogposts' });
  //dbName is the name of the database. Needed if you don't mention database name in the connection string on .env

  console.log('MongoDB Connected');
} catch (error) {
  console.log('Failed to connect to MongoDB ', error);
}
