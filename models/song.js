const database = require('../db/database');
const types = require('sequelize').DataTypes;
module.exports.Song = database.define('song', {
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
        },
        album: {
            type: types.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 128],
                    msg: "Album must be between 1 and 128 characters in length"
                }
            }
        },
        artist: {
            type: types.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 128],
                    msg: "Artist must be between 1 and 128 characters in length"
                }
            }
        }
    },
    {
        name: {
            singular: 'song',
            plural: 'songs'
        }
    }
);
