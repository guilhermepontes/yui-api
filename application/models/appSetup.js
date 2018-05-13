import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  setupComplete: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true,
});

export default schema;