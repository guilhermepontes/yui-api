import mongoose from 'mongoose';
import Address from './address';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    hidden: true,
  },
  avatar: {
    type: String,
  },
  address: {
    type: Address,
  },
  phone: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.model('user', schema);