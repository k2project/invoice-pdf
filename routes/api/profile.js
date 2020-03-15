const express = require('express');
const router = express.Router();
const token = require('../../middleware/token');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    GET api/profile/user
//@desc     Get user profile
//@status   Private
router.get('/user', token, async (req, res) => {
    try {
        const profile = await (
            await Profile.findOne({ user: req.user.id })
        ).populate('user', ['email']);
        if (!profile)
            return res.status(400).json({
                errors: [{ msg: "User's profile not found" }]
            });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    POST api/profile/
//@desc     Create or update the profile
//@status   Private
router.get('/user', token, async (req, res) => {
    const {
        fullName,
        company,
        address,
        bankName,
        bankAccount,
        bankSortCode,
        contactEmail,
        contactMobile
    } = req.body;
    const profileFields = {};

    profileFields.user = req.user.id;
    if (fullName) profileFields.fullName = fullName;
    if (company) profileFields.company = company;
    if (address) profileFields.address = address;

    profileFields.bank = {};
    if (bankName) profileFields.bank.name = bankName;
    if (bankAccount) profileFields.bank.account = bankAccount;
    if (bankSortCode) profileFields.bank.sortCode = bankSortCode;

    profileFields.contact = {};
    if (contactEmail) profileFields.contact.email = contactEmail;
    if (contactMobile) profileFields.contact.mobile = contactMobile;

    profileFields.companies = [];

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // update profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        //create a new profile
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;
