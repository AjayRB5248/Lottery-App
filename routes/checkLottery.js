const express = require('express');
const router = express.Router();

const { checkLottery } = require('../controller/checkLottery');

router.get('/mm/q', checkLottery);

module.exports = router;
