const express = require('express');
const router = express.Router();
const models = require('../../db/models');
const status = require('http-status-codes');
const authorization = require('../../lib/authorization');

router.get('/:id?', async (req, res) => {
    try {
        let where = {};
        if (req.params.id) where.id = req.params.id;
        if (req.query.userId) where.userId = req.query.userId;
        let songs = await models.song.findAll({
            where: where
        });
        res.status(status.OK).send(songs)
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error)
    }
});

router.post('/', authorization, async (req, res) => {
    try {
        if (!Array.isArray(req.body)) req.body = [req.body];
        req.body.map(song => {
            delete song.id;
            song.userId = req.userId;
        });
        let songs = await models.song.bulkCreate(req.body, {
            validate: true,
            returning: true
        });
        res.status(status.CREATED).send(songs.length > 1 ? songs : songs[0]);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error)
    }
});

router.put('/:id', authorization, async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        delete req.body.id;
        delete req.body.userId;
        let song = await models.song.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.userId
            },
            validate: true,
            returning: true
        });
        res.status(status.OK).send(song);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error)
    }
});

router.delete('/:id?', authorization, async (req, res) => {
    try {
        let rows = await models.song.destroy({
            where: {
                id: req.params.id ? req.params.id : req.body,
                userId: req.userId
            }
        });
        res.status(rows ? status.OK : status.NOT_FOUND).send();
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

module.exports = router;
