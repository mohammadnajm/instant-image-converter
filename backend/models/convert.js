const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convertSchema = Schema({
    total: { type: Number, index: true, default : 0 },

}, { timestamps: true, toJSON: { virtuals: true } });


module.exports = mongoose.model('Convert', convertSchema);