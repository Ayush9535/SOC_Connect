const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  date: { type: String, required: true },
  day: { type: String, required: true },
  description: { type: String, required: true }
});

const Holiday = mongoose.model('holidays', holidaySchema);
module.exports = {Holiday};
