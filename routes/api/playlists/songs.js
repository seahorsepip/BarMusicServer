const express = require('express');
const router = express.Router({mergeParams: true});
const models = require('../../../db/models');
const status = require('http-status-codes');
const authorization = require('../../../lib/authorization');

router.get('/', async (req, res) => {
    try {
        let playlist = await models.playlist.find({
            where: {
                id: req.params.playlistId
            }
        });
        let songs = await playlist.getSongs();
        res.status(status.OK).send(songs);
    } catch (error) {
        res.status(status.NOT_FOUND).send(error);
    }
});

router.post('/:id?', authorization, async (req, res) => {
    try {
        let [playlist, songs] = await Promise.all([
            models.playlist.find({
                where: {
                    id: req.params.playlistId,
                    userId: req.userId
                }
            }),
            models.song.findAll({
                where: {
                    id: req.params.id ? req.params.id : req.body,
                    userId: req.userId
                }
            })
        ]);
        songs = await playlist.addSongs(songs);
        res.status(songs.length ? status.CREATED : status.NOT_FOUND).send(songs.length ? songs.length > 1 ? songs[0] : songs[0][0] : null);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

router.delete('/:id?', authorization, async (req, res) => {
        try {
            let [playlist, songs] = await Promise.all([
                models.playlist.find({
                    where: {
                        id: req.params.playlistId,
                        userId: req.userId
                    }
                }),
                models.song.findAll({
                    where: {
                        id: req.params.id ? req.params.id : req.body,
                        userId: req.userId
                    }
                })
            ]);
            let rows = await playlist.removeSongs(songs);
            res.status(rows ? status.OK : status.NOT_FOUND).send();
        } catch (error) {
            res.status(status.BAD_REQUEST).send(error);
        }
    }
);

module.exports = router;