import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tabBarName: {
    type: String,
    required: true,
  },
  tabBarIcon: {
    type: String,
    required: true,
  },
  components: {
    type: [Component],
  },
}, {
  timestamps: true,
});

export default schema;