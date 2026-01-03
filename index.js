const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

const motoRoutes = require('./routes/motos');
app.use('/api/motos', motoRoutes);

const rideRoutes = require('./routes/ritten');
app.use('/api/ritten', ritRoutes);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));