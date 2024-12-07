const mongoose = require('mongoose');
const { Schema } = mongoose;

// Frequency Schema
const FrequencySchema = new Schema({
  type: { type: String, required: true },
  days: { type: [String], required: true }, // Array of strings for the days
  number: { type: Number, required: true },
});

// CompletedDays Schema
const CompletedDaysSchema = new Schema({
  _id: { type: String, required: true },
  date: { type: String, required: true }, // Store the date as a string (ISO format or any custom format)
});

const AreaSchema = new Schema({
    _id: { type: String, required: false },
    icon: { type: String, required: true },
    name: { type: String, required: true },
})

// Habit Schema
const HabitSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true }, // Assuming icon is stored as a string (you can modify it depending on how you store icons)
    frequency: { type: [FrequencySchema], required: true }, // An array of Frequency objects
    notification: { type: String, required: true },
    isNotification: { type: Boolean, required: true },
    area: { type: [AreaSchema], required: true }, // Assuming 'area' is an array of strings
    completedDays: { type: [CompletedDaysSchema], required: true }, // Array of completed days
});

// Create the model
export const Habit = mongoose.model('Habit', HabitSchema);
