const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const models = require('../../db/models');
const status = require('http-status-codes');
const moment = require('moment');

router.get('/', async (req, res) => {
    try {
        let where = {};
        if (req.query.userId) where.userId = req.query.userId;
        let votes = await models.song
            .findAll({
                attributes: [
                    'id', 'name', 'artist', 'album',
                    [sequelize.literal('(SELECT COUNT("votes"."songId") AS "count" FROM "votes" GROUP BY "votes"."songId" HAVING "votes"."songId" = "song"."id")'), 'count'],
                    [sequelize.literal('(SELECT MAX("votes"."updatedAt") FROM "votes" WHERE "votes"."songId" = "song"."id")'), 'updatedAt']
                ],
                where: where,
                order: [
                    [sequelize.col('count'), 'DESC'],
                    [sequelize.col('updatedAt'), 'ASC']
                ]
            })
            .filter(vote => vote.dataValues.count !== null);
        res.status(status.OK).send(votes);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        delete req.body.id;
        let previousVote = await models.vote.find({
            where: {
                deviceId: req.body.deviceId
            },
            include: [{
                model: models.song,
                where: {
                    id: req.body.songId
                }
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if (previousVote && new Date(previousVote.createdAt) > new Date(Date.now() - 1000 * 60 * 60 * 12)) {
            throw new Error('You already voted for this song, try again later');
        }
        let vote = await models.vote.create(req.body, {
            validate: true,
            returning: true
        });
        return res.status(status.CREATED).send(vote);
    } catch (error) {
        res.status(status.BAD_REQUEST).send(error);
    }
});

module.exports = router;
