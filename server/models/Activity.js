const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  dailyAchievements: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        default: 0,
      },
      name: {
        type: String, // Use the 'name' field as the category name
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
