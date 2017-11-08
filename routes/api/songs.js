const express = require('express');
const router = express.Router();
const models = require('../../db/models');
const status = require('http-status-codes');

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
        .then(songs => res.status(status.OK).send(songs))
        .catch(error => res.status(status.BAD_REQUEST).send(error));
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
        .then(song => res.status(status.OK).send(song))
        .catch(error => res.status(status.NOT_FOUND).send(error));
});

router.post('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let token = req.header('Authorization');
    //Do something with token and get user id
    let userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    if(!Array.isArray(req.body)) req.body = [req.body];
    req.body.map(song => {
        delete song.id;
        song.userId = userId;
    });
    models.song.bulkCreate(req.body, {
        validate: true,
        returning: true
    })
        .then(songs => res.status(status.CREATED).send(songs.length > 1 ? songs : songs[0]))
        .catch(error => res.status(status.BAD_REQUEST).send(error));
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
        .then((rows) => res.status(rows ? status.OK : status.NOT_FOUND).send())
        .catch(error => res.status(status.BAD_REQUEST).send(error));
});

module.exports = router;
