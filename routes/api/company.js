const express = require('express');
const router = express.Router();
const token = require('../../middleware/token');
const Profile = require('../../models/Profile');
const Company = require('../../models/Company');
const { check, validationResult } = require('express-validator');

//@route    GET api/company/all
//@desc     Get all profile's companies
//@status   Private
router.get('/all', token, async (req, res) => {
    try {
        const companies = await Company.find({ user: req.user.id });
        res.json(companies);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    POST api/company/
//@desc     Add a new company into user's profile
//@status   Private
router.post(
    '/',
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
        if (!errors.isEmpty()) {
            console.log('VALIDATION ERR WITH COMPANY FORM', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let company = await Company.findOne({
                user: req.user.id,
                companyName: req.body.companyName
            });
            if (company) {
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
            const newCompany = {
                user: req.user.id,
                ...req.body
            };
            company = new Company(newCompany);
            await company.save();
            res.json(company);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);
//@route    PUT api/company/:company_id
//@desc     Update the company in user's profile
//@status   Private
router.put(
    '/:company_id',
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
        try {
            // const profile = await Profile.findOne({ user: req.user.id });

            // const updatedItemIndex = profile.companies.findIndex(
            //     obj => obj._id === req.params.company_id
            // );
            // profile.companies = [
            //     ...profile.companies.slice(0, updatedItemIndex),
            //     req.body,
            //     ...profile.companies.slice(updatedItemIndex + 1)
            // ];
            // await profile.save();
            // res.json(profile);
            let company = await Company.findOne({
                _id: req.params.company_id
            });
            if (!company) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Company doesn't exists. Update failed."
                        }
                    ]
                });
            }
            company = await Company.findOneAndUpdate(
                { _id: req.params.company_id },
                { $set: req.body },
                { new: true }
            );
            res.json(company);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);
//@route    DELETE api/company/:company_id
//@desc     Delete company from user's profile
//@status   Private
router.delete('/:company_id', token, async (req, res) => {
    try {
        // const profile = await Profile.findOne({ user: req.user.id });
        // const updatedItemIndex = profile.companies.findIndex(
        //     obj => obj._id === req.params.company_id
        // );
        // profile.companies = [
        //     ...profile.companies.slice(0, updatedItemIndex),
        //     ...profile.companies.slice(updatedItemIndex + 1)
        // ];

        // await profile.save();
        // res.json(profile);
        const company = await Company.findByIdAndDelete(req.params.company_id);
        res.json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;

//@route    POST /api/company/tasks
//@desc     Add a new task to company profile
//@status   Private
router.post(
    '/tasks',
    [
        token,
        [
            check('taskDesc', 'Please describe the task to be saved.')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            const filter = { companies: [{ _id: req.body.company }] };
            const update = req.body;
            console.log(filter);
            await Profile.findOneAndUpdate(filter, update, {
                new: true
            });
            // const companyToUpdate = profile.companies.find(
            //     c => c._id === req.body.company
            // );
            // companyToUpdate.tasks.unshift(req.body);
            // console.log(companyToUpdate.tasks);
            // await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);
