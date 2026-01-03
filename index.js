const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());

const motoRoutes = require('./routes/motos');
app.use('/api/motos', motoRoutes);

const ritRoutes = require('./routes/ritten');
app.use('/api/ritten', ritRoutes);

app.get('/', (req, res) => {
  res.send('Motorrit tracker API is running.')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000.'));
  })
  .catch(err => console.error(err));