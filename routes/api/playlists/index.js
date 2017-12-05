const express = require('express');
const router = express.Router();
const models = require('../../../db/models');
const status = require('http-status-codes');
const authorization = require('../../../lib/authorization');

router.get('/:id?', async (req, res) => {
    let where = {};
    if (req.params.id) where.id = req.params.id;
    if (req.query.userId) where.userId = req.query.userId;
    try {
        let playlists = await models.playlist.findAll({
            attributes: ['id', 'name'],
            where: where
        });
        res.status(status.OK).send(playlists);
    } catch (error) {
        res.status(status.NOT_FOUND).send(error);
    }
});

router.post('/', authorization, async (req, res) => {
    try {
        delete req.body.id;
        req.body.userId = req.userId;
        let playlist = await models.playlist.create(req.body, {
            validate: true
        });
        res.status(status.CREATED).send(playlist);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

router.put('/:id', authorization, async (req, res) => {
    try {
        delete req.body.id;
        delete req.body.userId;
        let [rows, playlists] = await models.playlist.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.userId
            },
            validate: true,
            returning: true
        });
        res.status(rows ? status.OK : status.NOT_FOUND).send(rows ? playlists[0] : null);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

router.delete('/:id', authorization, async (req, res) => {
    try {
        let rows = await models.playlist.destroy({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        res.status(rows ? status.OK : status.NOT_FOUND).send();
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

router.use('/:playlistId/songs', require('./songs'));

module.exports = router;
