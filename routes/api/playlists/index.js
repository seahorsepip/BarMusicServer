var express = require('express');
var router = express.Router();
var models = require('../../../db/models');

router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.findAll({
        where: {
            userId: userId
        }
    }).then(function (playlists) {
        res.status(200).send(playlists);
    }).catch(function () {
        res.status(500).send();
    })
});

router.get('/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.find({
        where: {
            id: req.params.id,
            userId: userId
        }
    }).then(function (playlist) {
        res.status(200).send(playlist);
    }).catch(function () {
        res.status(500).send();
    })
});

router.post('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    delete req.body.id;
    req.body.userId = userId;
    models.playlist.create(req.body, {validate: true}).then(function () {
        res.status(200).send();
    }).catch(function () {
        res.status(500).send();
    });
});

router.delete('/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.destroy({
        where: {
            id: req.params.id,
            userId: userId
        }
    }).then(function () {
        res.status(200).send();
    }).catch(function () {
        res.status(500).send();
    });
});

router.use('/:playlistId/songs', require('./songs'));

module.exports = router;
