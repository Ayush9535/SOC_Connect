const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    personalInfo: {
        phone: { type: String, required: true },
        address: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        fathersName: { type: String, required: true },
        mothersName: { type: String, required: true },
        aadharNumber: { type: String, required: true, unique: true },
        emergencyContact: { type: String, required: true },
        bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
    },

    academicInfo: {
        department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }, // Link to department
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // Array of course references
        gpa: { type: Number, default: 0.0 }
    },

    assignments: [{
        assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }, // Reference to the Assignment
        status: { type: String, enum: ['Submitted', 'Pending'], default: 'Pending' },
        grade: { type: String, default: null }
    }],

    feedback: [{ type: String }] // Array of feedback messages
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = {
    StudentModel
};
