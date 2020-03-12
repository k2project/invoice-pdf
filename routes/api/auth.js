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
module.exports = router;
