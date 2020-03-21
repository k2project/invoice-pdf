const express = require('express');
const router = express.Router();
const token = require('../../middleware/token');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//@route    POST api/company
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
            const profile = await Profile.findOne({ user: req.user.id });

            const updatedItemIndex = profile.companies.findIndex(
                obj => obj._id === req.params.company_id
            );
            profile.companies = [
                ...profile.companies.slice(0, updatedItemIndex),
                req.body,
                ...profile.companies.slice(updatedItemIndex + 1)
            ];
            await profile.save();
            res.json(profile);
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
        const profile = await Profile.findOne({ user: req.user.id });
        const updatedItemIndex = profile.companies.findIndex(
            obj => obj._id === req.params.company_id
        );
        profile.companies = [
            ...profile.companies.slice(0, updatedItemIndex),
            ...profile.companies.slice(updatedItemIndex + 1)
        ];

        await profile.save();
        res.json(profile);
    } catch (err) {
        // console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;
