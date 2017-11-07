var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var models = require('../../../db/models');
models.establishFKs();

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

router.get('/:uuid', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';
    var uuid = req.params.uuid;

    models.playlist.find({
        where: {
            id: uuid,
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

router.delete('/:uuid', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';
    var uuid = req.params.uuid;

    models.playlist.destroy({
        where: {
            id: uuid,
            userId: userId
        }
    }).then(function () {
        res.status(200).send();
    }).catch(function () {
        res.status(500).send();
    });
});

router.use('/:uuid/songs', require('./songs'));

module.exports = router;
