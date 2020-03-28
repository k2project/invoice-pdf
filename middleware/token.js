const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../models/Token');

module.exports = async function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res
            .status(401)
            .json({ msg: 'Authorisation failed! No token found.' });
    try {
        const expiredTokens = await Token.find();

        if (expiredTokens.find(t => t.token === token)) {
            //token expired
            res.status(401).json({ msg: 'Invalid token.' });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token.' });
    }
};
