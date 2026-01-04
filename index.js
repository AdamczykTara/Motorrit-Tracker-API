const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const motoRoutes = require('./routes/motos');
app.use('/api/motos', motoRoutes);

const ritRoutes = require('./routes/ritten');
app.use('/api/ritten', ritRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000.'));
  })
  .catch(err => console.error(err));