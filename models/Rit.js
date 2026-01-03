const mongoose = require('mongoose');

const ritSchema = new mongoose.Schema({
    titel: {type: String, required: true},
    afstand: {type: Number, required: true},
    datum: {type: Date, required: true},
    moto: {type: mongoose.Schema.Types.ObjectId, ref: 'Moto', required: true}
});

module.exports = mongoose.model('Rit', ritSchema);