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
            return res.status(400).json({ msg: "User's profile not found" });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    POST api/profile/
//@desc     Create or update the profile
//@status   Private
router.post('/', token, async (req, res) => {
    const {
        fullName,
        company,
        addressLine1,
        addressLine2,
        town,
        county,
        postcode,
        email,
        mobile,
        bankName,
        bankAccount,
        bankSortCode
    } = req.body;
    const profileFields = {};

    profileFields.user = req.user.id;
    if (fullName) profileFields.fullName = fullName;
    if (company) profileFields.company = company;

    profileFields.address = {};
    if (addressLine1) profileFields.address.addressLine1 = addressLine1;
    if (addressLine2) profileFields.address.addressLine1 = addressLine2;
    if (town) profileFields.address.town = town;
    if (county) profileFields.address.county = county;
    if (postcode) profileFields.address.postcode = postcode;

    profileFields.bank = {};
    if (bankName) profileFields.bank.name = bankName;
    if (bankAccount) profileFields.bank.account = bankAccount;
    if (bankSortCode) profileFields.bank.sortCode = bankSortCode;

    profileFields.contact = {};
    if (email) profileFields.contact.email = email;
    if (mobile) profileFields.contact.mobile = mobile;

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

//@route    PUT api/profile/company
//@desc     Add a new company into user's profile
//@status   Private
router.put(
    '/company',
    [token, [check('name', "Company's name is required")]],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { name } = req.body;
        const newCompany = {
            name
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.companies.push(newCompany);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);
//@route    PUT api/profile/company/:company_id
//@desc     Update the company in user's profile
//@status   Private
router.put('/company/:company_id', token, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const upatedCompany = profile.companies.filter(
            item => item.id === req.params.company_id
        );
        upatedCompany = {
            ...upatedCompany,
            ...req.body
        };
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    DELETE api/profile/company/:company_id
//@desc     Delete company from user's profile
//@status   Private
router.delete('/company/:company_id', token, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.companies
            .map(item => item.id)
            .indexOf(req.params.company_id);
        profile.companies.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;
