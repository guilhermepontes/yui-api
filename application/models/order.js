import mongoose from 'mongoose';
import Address from './address';

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: [String],
    required: true,
  },
  discount: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: Address,
  },
  useUserAddress: {
    type: Boolean,
  },
}, {
  timestamps: true,
});

export default mongoose.model('order', schema);