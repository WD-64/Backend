import mongoose from 'mongoose';

try {
    const client = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${client.connection.host}`);
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
}
