const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    subjectId: { type: String, required: true },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculties', required: true },  
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
});

const AssignmentModel = mongoose.model('assignments', assignmentSchema);
module.exports = {
    AssignmentModel
};
