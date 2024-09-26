const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    personalInfo: {
        phone: { type: String },
        address: { type: String },
        dateOfBirth: { type: Date,  },
        fathersName: { type: String },
        mothersName: { type: String },
        aadharNumber: { type: String, unique: true },
        emergencyContact: { type: String },
        bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    },

    academicInfo: {
        department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }, // Link to department
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
