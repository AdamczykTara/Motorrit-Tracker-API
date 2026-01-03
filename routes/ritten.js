const express = require('express');
const Rit = require('../models/Rit');
const Moto = require('../models/Moto');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const ritten = await Rit.find()
      .skip(offset)
      .limit(limit)
      .populate('moto');

    res.json(ritten);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const filter = {};
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const numericFields = ['minAfstand', 'maxAfstand'];

    for (const field of numericFields) {
      if (req.query[field] && isNaN(req.query[field])) {
        return res.status(400).json({ error: `${field} moet een nummer zijn.` });
      }
    }

    if (
      req.query.minAfstand &&
      req.query.maxAfstand &&
      Number(req.query.minAfstand) > Number(req.query.maxAfstand)
    ) {
      return res.status(400).json({ error: 'minAfstand mag niet groter zijn dan maxAfstand.' });
    }

    if (
      req.query.vanDatum &&
      req.query.totDatum &&
      new Date(req.query.vanDatum) > new Date(req.query.totDatum)
    ) {
      return res.status(400).json({
        error: 'vanDatum moet voor totDatum liggen.'
      });
    }

    if (req.query.titel) {
      filter.titel = { $regex: req.query.titel, $options: 'i' };
    }

    if (req.query.minAfstand || req.query.maxAfstand) {
      filter.afstand = {};

      if (req.query.minAfstand) {
        filter.afstand.$gte = Number(req.query.minAfstand);
      }

      if (req.query.maxAfstand) {
        filter.afstand.$lte = Number(req.query.maxAfstand);
      }
    }

    if (req.query.vanDatum || req.query.totDatum) {
      filter.datum = {};

      if (req.query.vanDatum) {
        filter.datum.$gte = new Date(req.query.vanDatum);
      }

      if (req.query.totDatum) {
        filter.datum.$lte = new Date(req.query.totDatum);
      }
    }

    if (req.query.moto) {
      filter.moto = req.query.moto;
    }

    const sort = {};
    const allowedSortFields = ['datum', 'afstand', 'titel'];

    if (req.query.sortBy && allowedSortFields.includes(req.query.sortBy)) {
      sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
    }

    const ritten = await Rit.find(filter).sort(sort).skip(offset).limit(limit).populate('moto');
    
    res.json(ritten);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rit = await Rit.findById(req.params.id).populate('moto');

    if (!rit) {
      return res.status(404).json({ message: 'Rit niet gevonden.' });
    }

    res.json(rit);

  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { titel, afstand, datum, moto } = req.body;

    const bestaandeMoto = await Moto.findById(moto);
    if (!bestaandeMoto) {
      return res.status(400).json({ error: 'Moto bestaat niet.' });
    }

    const rit = new Rit({
      titel,
      afstand,
      datum,
      moto
    });

    await rit.save();

    res.status(201).json(rit);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const rit = await Rit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    );

    if (!rit) {
      return res.status(404).json({ message: 'Rit niet gevonden.' });
    }

    res.json(rit);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rit = await Rit.findByIdAndDelete(req.params.id);

    if (!rit) {
      return res.status(404).json({ message: 'Rit niet gevonden.' });
    }

    res.status(204).send();

  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;