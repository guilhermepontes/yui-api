import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

schema.index({
  name: 'text',
  description: 'text',
  price: 'text',
  category: 'text',
});

export default mongoose.model('product', schema);