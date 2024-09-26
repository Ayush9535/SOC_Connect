const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Faculty who assigned the task
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // The student to whom the assignment is assigned
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Submitted'], default: 'Pending' },
    submissionDate: { type: Date }
});

const AssignmentModel = mongoose.model('assignments', assignmentSchema);
module.exports = {
    AssignmentModel
};
