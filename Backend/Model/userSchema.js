const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'faculty', 'admin', 'alumni'] },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'assignments' }],
    attendance: { type: Number, default: 0 },
    feedback: [{ type: String }],

    personalInfo: {
        phone: String,
        address: String,
        dateOfBirth: Date,
    },

    department: { type: mongoose.Schema.Types.ObjectId, ref: 'departments' },

    studentDetails: {
        academicInfo: {
            courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
            gpa: Number
        }
    },

    alumniDetails: {
        engagementWithCollege: String,
        networks: [{ name: String, contact: String }],
        professionalOpportunities: [{ jobTitle: String, company: String }],
        socialMediaLinks: [{ platform: String, link: String }]
    },

    facultyDetails: {        
        subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }]
    },

    adminDetails: {
        departmentDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'departments' },
        studentOverview: [{
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            performance: String
        }]
    },
});

const userModel = mongoose.model("users", userSchema);

module.exports = {
    userModel
};
