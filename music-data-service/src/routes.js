const express = require('express');
const spotifyService = require('./spotifyService');

const router = express.Router();

router.get('/tracks', spotifyService.getTracks);

module.exports = router;
