const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: String,
    surname: String,
    company: String,
    address: String,
    bank: {
        name: String,
        account: Number,
        sortCode: String
    },
    contact: {
        email: String,
        mobile: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);
