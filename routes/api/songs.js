var express = require('express');
var router = express.Router();
var models = {
    song: require('../../models/song').Song
};

router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.song.findAll({
        where: {
            userId: userId
        }
    }).then(function (songs) {
        res.send(songs);
    });
});

router.post('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    req.body.map(function (song) {
        delete song.id;
        song.userId = userId;
    });
    models.song.bulkCreate(req.body, {validate: true}).then(function () {
        res.status(200).send();
    }).catch(function (error) {
        res.status(500).send();
    });
});

module.exports = router;
