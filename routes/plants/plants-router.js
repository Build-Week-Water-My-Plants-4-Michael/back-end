const express = require('express');

const Plants = require('./plants-model');

const router = express.Router();

const authMiddleware = require('../users/auth-middleware');

router.get('/', (req, res) => {
  Plants.find()
    .then((plants) => {
      res.json(plants);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get plants' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Plants.findById(id)
    .then((plants) => {
      if (plants) {
        res.json(plants);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find plants with given id.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get plants' });
    });
});

router.post('/', (req, res) => {
  const plantsData = req.body;

  Plants.add(plantsData)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to create new plants' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Plants.findById(id)
    .then((plants) => {
      if (plants) {
        Plants.update(changes, id).then((updatedPlant) => {
          res.status(201).json(updatedPlant);
        });
      } else {
        res.status(404).json({ message: 'Could not find plant with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to update plant' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Plants.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find Plants with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to Plants scheme' });
    });
});
module.exports = router;
