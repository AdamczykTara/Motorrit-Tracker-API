const express = require('express');
const Moto = require('../models/Moto');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const motos = await Moto.find()
      .skip(offset)
      .limit(limit);

    res.json(motos);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const filter = {};
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const numericFields = ['minJaar', 'maxJaar', 'minCc', 'maxCc'];

    for (const field of numericFields) {
      if (req.query[field] && isNaN(req.query[field])) {
        return res.status(400).json({ error: `${field} moet een nummer zijn.` });
      }
    }

    if (req.query.merk) {
      filter.merk = { $regex: req.query.merk, $options: 'i' };
    }

    if (req.query.model) {
      filter.model = { $regex: req.query.model, $options: 'i' };
    }
    
    if (req.query.minJaar || req.query.maxJaar) {
      filter.jaar = {};

      if (req.query.minJaar) {
        filter.jaar.$gte = Number(req.query.minJaar);
      }

      if (req.query.maxJaar) {
        filter.jaar.$lte = Number(req.query.maxJaar);
      }
    }

    if (req.query.minCc || req.query.maxCc) {
      filter.cc = {};

      if (req.query.minCc) {
        filter.cc.$gte = Number(req.query.minCc);
      }

      if (req.query.maxCc) {
        filter.cc.$lte = Number(req.query.maxCc);
      }
    }

    const motos = await Moto.find(filter).skip(offset).limit(limit);
    
    res.json(motos);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const moto = await Moto.findById(req.params.id);

    if (!moto) {
      return res.status(404).json({ message: 'Moto niet gevonden.' });
    }

    res.json(moto);

  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

router.post('/', async (req, res) => {
  try {
    const moto = new Moto(req.body);
    await moto.save();

    res.status(201).json(moto);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const moto = await Moto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    );

    if (!moto) {
      return res.status(404).json({ message: 'Moto niet gevonden.' });
    }

    res.json(moto);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const moto = await Moto.findByIdAndDelete(req.params.id);

    if (!moto) {
      return res.status(404).json({ message: 'Moto niet gevonden.' });
    }

    res.status(204).send();

  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;