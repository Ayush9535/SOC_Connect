const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },

    personalInfo: {
        phone: { type: String },
        address: { type: String },
        dateOfBirth: { type: Date },
        fathersName: { type: String },
        mothersName: { type: String },
        aadharNumber: { type: String },
        emergencyContact: { type: String },
        bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    },

    academicInfo: {
        department: { name: String, head: String },
        courses: [
            {
                name: { type: String },
                code: { type: String }
            }
        ],
        gpa: { type: Number, default: 0.0 }
    },

    assignments: [{
        assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignments' },
        status: { type: String, enum: ['Submitted', 'Pending'], default: 'Pending' },
        grade: { type: String, default: null }
    }],

    feedback: [{
        facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculties' },
        feedback: { type: String },
        feedbackDate: { type: Date, default: Date.now }
    }]
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = {
    StudentModel
};
