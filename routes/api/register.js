const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');

//@route    POST api/register
//@desc     Register user
//@status   Public
router.post(
    '/',
    [
        check('email', 'Please enter a valid email address.')
            .trim()
            .escape()
            .normalizeEmail()
            .isEmail(),
        check('password')
            .trim()
            .escape()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
            .withMessage(
                'Password must be at least 8 characters long and must contain a number and a uppercase letter.'
            )
            .custom((value, { req }) => {
                if (value !== req.body.password2) {
                    // trow error if passwords do not match
                    throw new Error("Passwords don't match.");
                } else {
                    //to get rid of 'invalid value' error
                    return true;
                }
            }),
        check('password2')
            .trim()
            .escape()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    // trow error if passwords do not match
                    throw new Error("Passwords don't match.");
                } else {
                    //to get rid of 'invalid value' error
                    return true;
                }
            })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('VALIDATION ERR WITH REG', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists.', param: 'email' }]
                });
            }
            user = new User({
                email,
                password
            });
            //encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //save a new user to DB
            await user.save();

            res.send('Account created successfully.');
        } catch (err) {
            console.log('REGISTRATION ERR', err);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
