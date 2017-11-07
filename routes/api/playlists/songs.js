var express = require('express');
var router = express.Router({ mergeParams: true });
var models = require('../../../db/models')

router.get('/', function (req, res) {
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
        return playlist.getSongs();
    }).then(function (songs) {
        res.status(200).send(songs);
    }).catch(function () {
        res.status(500).send();
    });
});

router.post('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';
    var uuid = req.params.uuid;

    sequelize.Promise.all([
        models.playlist.find({
            where: {
                id: uuid,
                userId: userId
            }
        }),
        models.song.findAll({
            where: {
                id: req.body,
                userId: userId
            }
        })
    ]).spread(function (playlist, songs) {
        return playlist.addSongs(songs);
    }).then(function () {
        res.status(200).send();
    }).catch(function () {
        res.status(500).send();
    });
});

router.delete('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';
    var uuid = req.params.uuid;

    sequelize.Promise.all([
        models.playlist.find({
            where: {
                id: uuid,
                userId: userId
            }
        }),
        models.song.findAll({
            where: {
                id: req.body,
                userId: userId
            }
        })
    ]).spread(function (playlist, songs) {
        return playlist.removeSongs(songs);
    }).then(function () {
        res.status(200).send();
    }).catch(function () {
        res.status(500).send();
    });
});

module.exports = router;
