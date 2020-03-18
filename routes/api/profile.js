const express = require('express');
const router = express.Router();
const token = require('../../middleware/token');
const Profile = require('../../models/Profile');
// const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const config = require('config');

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
        website,
        mobile,
        fax,
        bankName,
        bankAccount,
        bankSortCode
    } = req.body;
    const profileFields = {};

    profileFields.user = req.user.id;
    profileFields.fullName = fullName;
    profileFields.company = company;

    profileFields.address = [
        addressLine1,
        addressLine2,
        town,
        county,
        postcode
    ];

    profileFields.bank = {
        bankName,
        bankAccount,
        bankSortCode
    };

    profileFields.contact = {
        email,
        website,
        mobile,
        fax
    };

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
    [
        token,
        [
            check('companyName', "Company's name is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const newCompany = {
            ...req.body
        };
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            const exisitingCompany = profile.companies.filter(
                c => c.companyName === req.body.companyName
            );
            if (exisitingCompany.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg:
                                'Company already exists. Please update the existing one or change the name.',
                            param: 'companyName'
                        }
                    ]
                });
            }

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
        // console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;
