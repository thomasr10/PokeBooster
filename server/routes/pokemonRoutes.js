const express = require('express');
const router = express.Router();
const apiPokemonController = require('../controllers/apiPokemonController');

router.post('/sets', apiPokemonController.getAllSets);

module.exports = router;