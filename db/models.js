const models = {
    song: require('../models/song').Song,
    playlist: require('../models/playlist').Playlist,
    songPlaylist: require('../models/songPlaylist').SongPlaylist,
    vote: require('../models/vote').Vote
};

models.song.belongsToMany(models.playlist, {
    through: models.songPlaylist,
    constraints: false
});

models.playlist.belongsToMany(models.song, {
    through: models.songPlaylist,
    constraints: false
});
models.vote.belongsTo(models.song);
models.song.hasMany(models.vote);

module.exports.song = models.song;
module.exports.playlist = models.playlist;
module.exports.vote = models.vote;