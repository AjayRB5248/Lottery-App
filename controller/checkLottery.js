const User = require('../models/User');
const { MegamillionResult, PowerballResult } = require('../models/lottery');
const { calculateMegaMillion } = require('../utils/MegaMillion');
const {
  comparePowerballNumbers,
  calculatePowerball,
} = require('../utils/PowerBall');
const { checkMegaBall, compareNumbers } = require('../utils/helperFunctions');

const MMWinningNumbers = async (req, res) => {
  try {
    const latestMmWinningNumber = await MegamillionResult.findOne({}).sort({
      _id: -1,
    });
    return latestMmWinningNumber;
  } catch (error) {
    console.error(error);
  }
};
const PBWinningNumbers = async (req, res) => {
  try {
    const latestPbWinningNumber = await PowerballResult.findOne({}).sort({
      _id: -1,
    });
    return latestPbWinningNumber;
  } catch (error) {
    console.error(error);
  }
};

const checkMMLottery = async (req, res) => {
  const userNumbers = req.query.userNumber.trim().split(',').map(Number);

  const winningMegaMillions = await MMWinningNumbers();

  if (userNumbers.length !== 6 || userNumbers.some(isNaN)) {
    res.status(400).json({
      error: 'Invalid input. Please provide 6 numbers separated by commas.',
    });
    return;
  }

  const matchedNumbers = compareNumbers(
    userNumbers.slice(0, 5),
    winningMegaMillions.winningNumber
  );

  const hasMegaBall = checkMegaBall(
    userNumbers[5],
    winningMegaMillions.megaball
  );

  const prize = calculateMegaMillion(
    matchedNumbers,
    hasMegaBall,
    winningMegaMillions.megaplier,
    winningMegaMillions.jackpot
  );

  if (req.user) {
    // If the user is logged in, update the user's lottery history
    try {
      console.log(req.user, 'megaMillion');
      const userId = req.user.token;
      console.log(userId);
      await User.findByIdAndUpdate(userId, {
        $push: {
          lotteryHistory: {
            numbers: userNumbers.slice(0, 5),
            megaball: userNumbers[5],
            category: 'megamillion',
            drawdate: winningMegaMillions.drawDate,
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        error: 'An error occurred while updating lottery history.',
      });
      return;
    }
  }

  res.status(200).json({
    winningNumbers: winningMegaMillions.winningNumber,
    megaBall: winningMegaMillions.megaball,
    userNumbers: userNumbers.slice(0, 5),
    userMegaBall: userNumbers[5],
    prize,
  });
};

const checkPBLottery = async (req, res) => {
  const userNumbers = req.query.userNumber.trim().split(',').map(Number);
  const winningPowerball = await PBWinningNumbers();

  if (userNumbers.length !== 6 || userNumbers.some(isNaN)) {
    res.status(400).json({
      error: 'Invalid input. Please provide 6 numbers separated by commas.',
    });
    return;
  }
  const matchedNumbersInfo = comparePowerballNumbers(
    userNumbers.slice(0, 5),
    userNumbers[5],
    winningPowerball
  );

  const prize = calculatePowerball(
    matchedNumbersInfo.matchedNumbers,
    matchedNumbersInfo.hasPowerball,
    winningPowerball.powerball,
    winningPowerball.jackpot
  );

  // Update the user's lottery history
  if (req.user) {
    console.log(req.user, 'powerBall');
    try {
      const userId = req.user.token;
      console.log(userId);
      await User.findByIdAndUpdate(userId, {
        $push: {
          lotteryHistory: {
            numbers: userNumbers.slice(0, 5),
            megaball: userNumbers[5],
            category: 'powerball',
            drawdate: winningPowerball.drawDate,
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        error: 'An error occurred while updating lottery history.',
      });
      return;
    }
  }

  res.json({
    winningNumbers: winningPowerball.winningNumber,
    powerball: winningPowerball.powerball,
    userNumbers: userNumbers.slice(0, 5),
    userPowerball: userNumbers[5],
    prize,
  });
};

module.exports = {
  checkMMLottery,
  checkPBLottery,
};
