const express = require("express");
const router = express.Router();

const {
  checkMMLottery,
  checkPBLottery,
} = require("../controller/checkLottery");

router.get("/megamillion", checkMMLottery);
router.get("/powerball", checkPBLottery);

module.exports = router;
