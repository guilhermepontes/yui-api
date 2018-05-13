import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true,
});

export default schema;