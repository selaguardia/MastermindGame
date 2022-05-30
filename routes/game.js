const express = require('express');
const {gameView} = require('../controllers/gameController');
const router = express.Router();

router.get('/game', gameView);

module.exports = router;