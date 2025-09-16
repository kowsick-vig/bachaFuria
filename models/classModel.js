const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A class must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A class must have a price'],
  },
  image: {
    type: String,
    required: [true, 'A class must have a cover image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //limit this field to client.
  },
  difficulty: {
    type: String,
    trim: true,
    required: [true, 'A class must have difficulty'],
  },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
