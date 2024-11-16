const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    car_type: { type: String, required: true },
    company: { type: String, required: true },
    dealer: { type: String, required: true },
  },
  images: {
    type: [String],
    validate: [arrayLimit, 'Cannot upload more than 10 images'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

function arrayLimit(val) {
    return val.length <= 10;
}
  

module.exports = mongoose.model('Car', carSchema);