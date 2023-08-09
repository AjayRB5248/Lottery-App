const express = require('express');
const router = express.Router();
const { getUserHistory } = require('../controller/getUserHistory');

router.get('/getUserHistory', getUserHistory);

module.exports = router;
