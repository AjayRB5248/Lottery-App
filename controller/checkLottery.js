const User = require('../models/User');
const { MegamillionResult, PowerballResult } = require('../models/lottery');
const { calculateMegaMillion } = require('../utils/MegaMillion');
const {
  comparePowerballNumbers,
  calculatePowerball,
} = require('../utils/PowerBall');
const { checkMegaBall, compareNumbers } = require('../utils/helperFunctions');

const MMWinningNumbers = async (rew, res) => {
  try {
    const latestMmWinningNumber = await MegamillionResult.findOne({}).sort({
      _id: -1,
    });
    return latestMmWinningNumber;
  } catch (error) {
    console.error(error);
  }
};
const PBWinningNumbers = async (rew, res) => {
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
    winningMegaMillions.megaplier
  );

  // Update the user's lottery history
  try {
    const userId = req.user.token;
    await User.findByIdAndUpdate(userId, {
      $push: {
        lotteryHistory: {
          numbers: userNumbers.slice(0, 5),
          category: 'megamillion',
          timestamp: new Date(),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while updating lottery history.',
    });
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
    winningPowerball.powerball
  );

  // Update the user's lottery history
  try {
    const userId = req.user.token;
    await User.findByIdAndUpdate(userId, {
      $push: {
        lotteryHistory: {
          numbers: userNumbers.slice(0, 5),
          category: 'powerball',
          powerball: userNumbers[5],
          timestamp: new Date(),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while updating lottery history.',
    });
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
