const express = require("express");
const router = express.Router();
const {
  getUserHistory,
  getLotteryHistory,
} = require("../controller/getUserHistory");

router.get("/getUserHistory", getUserHistory);
router.get("/getLotteryHistory", getLotteryHistory);

module.exports = router;
