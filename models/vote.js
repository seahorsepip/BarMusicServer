const database = require('../db/database');
const types = require('sequelize').DataTypes;
module.exports.Vote = database.define('vote', {
        id: {
            type: types.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: database.fn('uuid_generate_v4')
        },
        deviceId: {
            type: types.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 128],
                    msg: "DeviceId must be between 1 and 128 characters in length"
                }
            }
        }
    },
    {
        name: {
            singular: 'vote',
            plural: 'votes'
        }
    }
);
