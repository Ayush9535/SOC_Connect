const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    grade: String
});

const assignmentModel = mongoose.model('assignments', assignmentSchema);

module.exports = {
    assignmentModel
};
