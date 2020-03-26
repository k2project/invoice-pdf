const express = require('express');
const router = express.Router();
const token = require('../../middleware/token');
const Profile = require('../../models/Profile');

//@route    GET api/profile/
//@desc     Get user profile
//@status   Private
router.get('/', token, async (req, res) => {
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

module.exports = router;
