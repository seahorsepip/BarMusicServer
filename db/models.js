const models = {
    song: require('../models/song').Song,
    playlist: require('../models/playlist').Playlist,
    songPlaylist: require('../models/songPlaylist').SongPlaylist
};

models.song.belongsToMany(models.playlist, {
    through: models.songPlaylist,
    constraints: false
});

models.playlist.belongsToMany(models.song, {
    through: models.songPlaylist,
    constraints: false
});

module.exports.song = models.song;
module.exports.playlist = models.playlist;