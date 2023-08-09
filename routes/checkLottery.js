const express = require('express');
const router = express.Router();

const { checkMMLottery } = require('../controller/checkLottery');

router.post('/megamillion', checkMMLottery);
// router.post('/powerball', checkPBLottery);

module.exports = router;
