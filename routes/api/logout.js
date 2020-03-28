const express = require('express');
const router = express.Router();
const Token = require('../../models/Token');

//@route    POST api/logout
//@desc     Add token to list of expired tokens
//@status   Public
router.post('/', async (req, res) => {
    try {
        //remove token older then 8 hours
        const tokens = await Token.find();
        tokens.map(async token => {
            //remove over 8hr old
            //already expired
            if (new Date() - token.date > 2.88e7) {
                console.log(token);
                await Token.findByIdAndDelete(token._id);
            }
        });
        //add current token to expired list
        const token = new Token(req.body);
        await token.save();
        res.json('Token saved.');
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
module.exports = router;
