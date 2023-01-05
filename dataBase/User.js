const mongoose = require('mongoose');
const rolesEnum = require("../configs/roles.enum");

const UserScheme = new mongoose.Schema({
        name: {type: String, trim: true, default: ''},
        email: {type: String, trim: true, lowercase: true, required: true, unique: true},
        role: {type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('User', UserScheme);