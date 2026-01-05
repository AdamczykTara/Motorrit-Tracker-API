const mongoose = require('mongoose');

const ritSchema = new mongoose.Schema({
    titel: {type: String, required: true, trim: true},
    afstand: {type: Number, required: true, min: 1},
    datum: {type: Date, required: true},
    moto: {type: mongoose.Schema.Types.ObjectId, ref: 'Moto', required: true}
});

module.exports = mongoose.model('Rit', ritSchema);