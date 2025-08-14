import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    author: { type: Schema.Types.ObjectId, required: [true, 'Author is required'] },
    image: { type: String, required: [true, 'Cover image is required'] },
    content: { type: String, required: [true, 'Body is required'] }
  },
  {
    timestamps: true
  }
);

export default model('Post', postSchema);
