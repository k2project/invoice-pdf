const express = require('express');
const router = express.Router();
const token = require('../../middleware/token');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route    GET api/auth/user
//@desc     Get user data
//@status   Private
router.get('/user', token, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    POSt api/auth/login
//@desc     Authorise login and return token
//@status   Public
router.post(
    '/login',
    [
        check('email', 'Please include valid email')
            .trim()
            .escape()
            .normalizeEmail()
            .isEmail(),
        check('password', 'Password is required')
            .trim()
            .escape()
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user)
                return res.status(400).json({
                    errors: [{ msg: 'Invalid login credentials' }]
                });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    errors: [{ msg: 'Invalid login credentials' }]
                });
            const paylod = { user: { id: user.id } };
            jwt.sign(
                paylod,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

//@route    DELETE api/auth/unregister
//@desc     Delete user's account and profile
//@status   Private
router.delete('/unregister', token, async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User account deleted.' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
//@route    POST api/auth/unregister
//@desc     Authorise laccount deactivation
//@status   Public
router.post(
    '/unregister',
    [
        check(
            'password',
            'To delete yor account you must provide your password.'
        )
            .trim()
            .escape()
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id, password } = req.body;
        try {
            let user = await User.findOne({ _id: id });
            if (!user)
                return res.status(400).json({
                    errors: [{ msg: 'Cant find the user' }]
                });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    errors: [{ msg: 'Incorrect password.' }]
                });
            res.json({ msg: 'Deregistration authorised.' });
        } catch (err) {
            // console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
//@route    PUT /api/auth/change-password
//@desc     Change password
//@status   Private
router.put(
    '/change-password',
    [
        token,
        [
            check('currentPassword', 'Please enter your current password.')
                .trim()
                .escape()
                .not()
                .isEmpty(),
            check('newPassword')
                .trim()
                .escape()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
                .withMessage(
                    'Password must be at least 8 characters long and must contain a number and a uppercase letter.'
                )
                .custom((value, { req }) => {
                    if (value === req.body.currentPassword) {
                        // trow error if passwords do not match
                        throw new Error(
                            'New passwords must be different to the current one.'
                        );
                    } else {
                        //to get rid of 'invalid value' error
                        return true;
                    }
                })
                .custom((value, { req }) => {
                    if (value !== req.body.newPasswordConfirmation) {
                        // trow error if passwords do not match
                        throw new Error("New passwords don't match.");
                    } else {
                        //to get rid of 'invalid value' error
                        return true;
                    }
                }),
            check('newPasswordConfirmation')
                .trim()
                .escape()
                .custom((value, { req }) => {
                    if (value !== req.body.newPassword) {
                        // trow error if passwords do not match
                        throw new Error("New passwords don't match.");
                    } else {
                        //to get rid of 'invalid value' error
                        return true;
                    }
                })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, newPassword } = req.body;
        try {
            //encrypt password
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(newPassword, salt);
            //update password
            await User.findOneAndUpdate(
                { _id: id },
                { $set: { password } },
                { new: true }
            );
            res.send('Password has been updated successfully.');
        } catch (err) {
            // console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
