var database = require('../db/database');
var types = require('sequelize').DataTypes;
module.exports.SongPlaylist = database.define('songs_playlists');
