var database = require('../db/database');
var models = {
    song: require('../models/song').Song,
    playlist: require('../models/playlist').Playlist
};
module.exports.estabilishFKs = function () {
    models.song.belongsToMany(models.playlist, {
        as: 'song',
        through: 'song_playlist',
        foreignKey: 'song_id',
        constraints: false
    });
    models.playlist.belongsToMany(models.song, {
        as: 'playlist',
        through: 'song_playlist',
        foreignKey: 'playlist_id',
        constraints: false
    });
};
