import mongoose from 'mongoose';

//The below schema will be referred to in UserSchema below
const ReadingListSchema = new mongoose.Schema({
  bookRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  status: {
    type: String,
    enum: ['read', 'not read', 'pending'],
    default: 'pending',
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, 'min length is 2 chars'],
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  readingList: {
    type: [ReadingListSchema], //You can refer to another schema in type too.
    default: () => [],
  },
});

export default mongoose.model('User', UserSchema);
