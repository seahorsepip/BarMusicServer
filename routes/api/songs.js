const express = require('express');
const router = express.Router();
const models = require('../../db/models');

router.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.song.findAll({
        where: {
            userId: userId
        }
    })
        .then(songs => res.status(200).send(songs))
        .catch(() => res.status(500).send());
});

router.get('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.song.find({
        where: {
            id: req.params.id,
            userId: userId
        }
    })
        .then(song => res.status(200).send(song))
        .catch(() => res.status(500).send());
});

router.post('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    req.body.map(song => {
        delete song.id;
        song.userId = userId;
    });
    models.song.bulkCreate(req.body, {
        validate: true
    })
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

router.delete('/:id?', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.song.destroy({
        where: {
            id: req.params.id ? req.params.id : req.body,
            userId: userId
        }
    })
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});

module.exports = router;
