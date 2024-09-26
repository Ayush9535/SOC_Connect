const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
})
const AdminModel = mongoose.model("admins", adminSchema);
module.exports = {
    AdminModel
};