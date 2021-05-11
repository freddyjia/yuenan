
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = new mongoose.Schema({
    zalo: { type: String, required: true, unique: true },
    facebook: { type: String, required: true, unique: true },
    telegrem: { type: String, required: true, unique: true },
});
module.exports = mongoose.model('kefu', Schema);
