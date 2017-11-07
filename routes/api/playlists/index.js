var express = require('express');
var router = express.Router();
var models = require('../../../db/models');

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
        .then(playlists => res.status(200).send(playlists))
        .catch(() => res.status(500).send());
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
        .then(playlist => res.status(200).send(playlist))
        .catch(() => res.status(500).send());
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
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
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
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

router.use('/:playlistId/songs', require('./songs'));

module.exports = router;
