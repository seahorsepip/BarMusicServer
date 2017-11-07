const express = require('express');
const router = express.Router({mergeParams: true});
const models = require('../../../db/models');
const status = require('http-status-codes');

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.find({
        where: {
            id: req.params.playlistId,
            userId: userId
        }
    })
        .then(playlist => playlist.getSongs())
        .then(songs => res.status(status.OK).send(songs))
        .catch(() => res.status(status.NOT_FOUND).send());
});

router.post('/:id?', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    Promise.all([
        models.playlist.find({
            where: {
                id: req.params.playlistId,
                userId: userId
            }
        }),
        models.song.findAll({
            where: {
                id: req.params.id ? req.params.id : req.body,
                userId: userId
            }
        })
    ])
        .then(([playlist, songs]) => playlist.addSongs(songs))
        .then(() => res.status(status.CREATED).send())
        .catch(() => res.status(status.BAD_REQUEST).send());
});

router.delete('/:id?', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    Promise.all([
        models.playlist.find({
            where: {
                id: req.params.playlistId,
                userId: userId
            }
        }),
        models.song.findAll({
            where: {
                id: req.params.id ? req.params.id : req.body,
                userId: userId
            }
        })
    ])
        .then(([playlist, songs]) => playlist.removeSongs(songs))
        .then((rows) => res.status(rows ? status.OK : status.NOT_FOUND).send())
        .catch(() => res.status(status.BAD_REQUEST).send());
});

module.exports = router;