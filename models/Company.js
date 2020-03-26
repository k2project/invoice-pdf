const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    companyName: String,
    companyAcronym: String,
    showAcronym: Boolean,
    addressLine1: String,
    addressLine2: String,
    town: String,
    county: String,
    postcode: String,
    bankName: String,
    bankAccount: String,
    bankSortCode: String,
    email: String,
    website: String,
    mobile: String,
    fax: String,
    companyInfo: String,
    tasks: [],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Company = mongoose.model('company', CompanySchema);
