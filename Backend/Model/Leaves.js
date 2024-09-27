const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    facultyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'faculties', 
        required: true 
    },
    leaveType: { 
        type: String, 
        enum: ['Sick Leave', 'Casual Leave', 'Earned Leave'],
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    appliedDate: { 
        type: Date, 
        default: Date.now 
    }
});

const LeaveModel = mongoose.model('leaves', leaveSchema);
module.exports = {
    LeaveModel
};
