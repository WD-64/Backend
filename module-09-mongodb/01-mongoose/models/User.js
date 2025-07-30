import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  hobbies: [String],
});

const User = model('user', userSchema);

export default User;
