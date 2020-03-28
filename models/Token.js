const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Token = mongoose.model('token', TokenSchema);
