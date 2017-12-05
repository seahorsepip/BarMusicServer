const fetch = require('node-fetch');
const status = require('http-status-codes');

module.exports = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        let response = await fetch('http://maatwerk.works/oauth/me', {headers: {Authorization: token}});
        console.log(response.status);
        if(response.status !== status.OK) throw new Error("Unauthorized");
        let profile = await response.json();
        req.userId = profile.id;
        next();
    } catch (error) {
        res.status(status.UNAUTHORIZED).send(error);
    }
};