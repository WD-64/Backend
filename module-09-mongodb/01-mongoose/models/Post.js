import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorID: {
    type: Schema.Types.ObjectId, //Mention that this field will store an ObjectID and not a regular string
    ref: 'user', //The name here needs to be the exact same thing you mention on User Model.
  },
});

const Post = model('post', postSchema);

export default Post;
