const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
    merk: {type: String, required: true},
    model: {type: String, required: true},
    jaar: {type: Number, required: true},
    cc: {type: Number, required: true}
});

module.exports = mongoose.model('Moto', motoSchema);