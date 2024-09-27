const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    facultyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'faculties', 
        required: true 
    },
    feedback: { 
        type: String, 
        required: true 
    },
    feedbackDate: { 
        type: Date, 
        default: Date.now 
    }
});

const FeedbackModel = mongoose.model('feedbacks', feedbackSchema);
module.exports = {
    FeedbackModel
};