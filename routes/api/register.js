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
        check('email', 'Please enter a valid email address.').isEmail(),
        check('password')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 chars long.')
            .matches(/\d/)
            .withMessage('Password must contain a number.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erorrs: errors.array() });
        }
        const { email, password } = req.body;
        try {
            //check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists.' }] });
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
            //asign a token
            const payload = { user: { id: user.id } };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
