import mongoose from 'mongoose';
import Screen from './address';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['store', 'news'],
  },
  screens: {
    type: [Screen],
    required: true,
  },
});

export default mongoose.model('app', schema);