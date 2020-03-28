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
            const company = await Company.findOne({ _id: req.body.company });
            company.tasks.push(req.body);
            await company.save();
            res.json(company);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);
//@route    DELETE /api/company/tasks/:task_id
//@desc     Remove the task from the list
//@status   Private
router.delete('/tasks/:task_id', token, async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.body.company });

        const itemIndex = company.tasks.findIndex(
            obj => obj._id === req.params.task_id
        );
        company.tasks = [
            ...company.tasks.slice(0, itemIndex),
            ...company.tasks.slice(itemIndex + 1)
        ];

        await company.save();
        res.json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    PUT /api/company/tasks/:task_id
//@desc     Update the task in the list
//@status   Private
router.put('/tasks/:task_id', token, async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.body.company });

        const itemIndex = company.tasks.findIndex(
            obj => obj._id === req.params.task_id
        );
        company.tasks = [
            ...company.tasks.slice(0, itemIndex),
            req.body,
            ...company.tasks.slice(itemIndex + 1)
        ];

        await company.save();
        res.json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    PUT /api/company/tasks/invoice-display/:task_id
//@desc     Update the display of task in a new invocie.
//@status   Private
router.put('/tasks/invoice-display/:task_id', token, async (req, res) => {
    try {
        const company = await Company.findOne({ _id: req.body.data.company });

        const itemIndex = company.tasks.findIndex(
            obj => obj._id === req.params.task_id
        );

        company.tasks = [
            ...company.tasks.slice(0, itemIndex),
            req.body.data.task,
            ...company.tasks.slice(itemIndex + 1)
        ];

        await company.save();
        res.json(company);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;
