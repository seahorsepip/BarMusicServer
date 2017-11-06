var express = require('express');
var router = express.Router();
var sequelize = require('../../db/database');
var models = {
    song: require('../../models/song').Song,
    playlist: require('../../models/playlist').Playlist
};

router.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    models.playlist.findAll({
        where: {
            userId: userId
        }
    }).then(function (playlists) {
        res.send(playlists);
    });
});

router.post('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';

    delete req.body.id;
    req.body.userId = userId;
    models.playlist.create(req.body, {validate: true}).then(function () {
        res.status(200).send();
    }).catch(function (error) {
        res.status(500).send(error);
    });
});

router.patch('/:uuid', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var token = req.header('Authorization');
    //Do something with token and get user id
    var userId = 'd9886952-0d27-43bd-aa19-1c9c3900411d';
    var uuid = req.params.uuid;

    //Remove songs from playlist

    //Add songs to playlist
    sequelize.query('DO $do$ BEGIN IF EXISTS (SELECT * FROM playlists WHERE id = :playlist AND "userId" = :user) THEN INSERT INTO song_playlist SELECT NOW(), NOW(), id, :playlist FROM songs WHERE songs."userId" = :user AND songs.id IN(:songs);END IF;END $do$;',
        {
            replacements: {
                playlist: uuid,
                user: userId,
                songs: req.body
            },
            type: sequelize.QueryTypes.INSERT
        }
    ).then(function () {
        res.status(200).send();
    }).catch(function () {
        res.status(500).send();
    });

    /*
     models.song.findAll({
     include: [{
     model: model.playlist,
     through: {
     where: {
     id: uuid
     }
     }
     }]
     }).then(function(songs) {
     console.log(songs);
     }).catch(function (error) {
     res.status(500).send("NOES");
     });

     /*
     models.playlist.find({
     where: {
     id: req.params.uuid,
     userId: userId
     }
     }).then(function (playlist) {
     playlist.getChildren().then(function(songs) {
     console.log(songs);
     }).catch(function (error) {
     res.status(500).send("NOES");
     });

     models.song.findAll().then(function (songs) {
     playlist.setSongs(songs).then(function () {
     res.status(200).send();
     }).catch(function (error) {
     res.status(500).send("FUCK");
     })
     res.status(200).send();
     }).catch(function (error) {
     res.status(500).send("OH");
     })
     }).catch(function (error) {
     res.status(500).send("NO");
     });*/
});

module.exports = router;
