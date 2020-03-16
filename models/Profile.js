const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    fullName: String,
    company: String,
    address: Array,
    bank: {
        name: String,
        account: Number,
        sortCode: String
    },
    contact: {
        email: String,
        mobile: Number
    },
    comapnies: Array,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);
