const express = require('express');
const router = express.Router();
const models = require('../../../db/models');
const status = require('http-status-codes');

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.findAll({
        where: {
            userId: userId
        }
    })
        .then(playlists => res.status(status.OK).send(playlists))
        .catch(() => res.status(status.NOT_FOUND).send());
});

router.get('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.find({
        where: {
            id: req.params.id,
            userId: userId
        }
    })
        .then(playlist => res.status(status.OK).send(playlist))
        .catch(() => res.status(status.NOT_FOUND).send());
});

router.post('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    delete req.body.id;
    req.body.userId = userId;
    models.playlist.create(req.body, {
        validate: true
    })
        .then(() => res.status(status.CREATED).send())
        .catch(() => res.status(status.BAD_REQUEST).send());
});

router.put('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    delete req.body.id;
    delete req.body.userId;
    models.playlist.update(req.body, {
        where: {
            id: req.params.id,
            userId: userId
        },
        validate: true
    })
        .then(([rows, instances]) => res.status(rows ? status.OK : status.NOT_FOUND).send())
        .catch(() => res.status(status.BAD_REQUEST).send());
});

router.delete('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.destroy({
        where: {
            id: req.params.id,
            userId: userId
        }
    })
        .then((rows) => res.status(rows ? status.OK : status.NOT_FOUND).send())
        .catch(() => res.status(status.BAD_REQUEST).send());
});

router.use('/:playlistId/songs', require('./songs'));

module.exports = router;
