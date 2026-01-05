const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
    merk: {type: String, required: true, trim: true},
    model: {type: String, required: true, trim: true},
    jaar: {type: Number, required: true, min: 1900},
    cc: {type: Number, required: true, min: 50}
});

module.exports = mongoose.model('Moto', motoSchema);