var database = require('../db/database');
var types = require('sequelize').DataTypes;
module.exports.Playlist = database.define('playlist', {
        id: {
            type: types.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: database.fn('uuid_generate_v4')
        },
        userId: {
            type: types.UUID,
            allowNull: false
        },
        name: {
            type: types.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 128],
                    msg: "Name must be between 1 and 128 characters in length"
                }
            }
        }
    },
    {
        name: {
            singular: 'playlist',
            plural: 'playlists'
        }
    }
);
