const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['student', 'faculty', 'admin', 'alumni'] },
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'assignments' }],
    attendance: { type: Number, default: 0 },
    feedback: [{ type: String }],
})

const userModel = mongoose.model("users", userSchema)

module.exports = {
    userModel
}