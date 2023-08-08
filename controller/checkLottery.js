const { calculateMegaMillion } = require('../utils/MegaMillion');
const {
  checkMegaBall,
  compareNumbers,
  winningNumbers,
} = require('../utils/helperFunctions');

const checkLottery = async (req, res) => {
  //  /mm/q/q?userNumber=10,20,30,40,50,60
  const userNumbers = req.query.userNumber.trim().split(',').map(Number);
  console.log({ userNumbers });
  const winningMegaMillions = winningNumbers.megamillions;

  if (userNumbers.length !== 6 || userNumbers.some(isNaN)) {
    res.status(400).json({
      error: 'Invalid input. Please provide 6 numbers separated by commas.',
    });
    return;
  }
  const matchedNumbers = compareNumbers(
    userNumbers.slice(0, 5),
    winningMegaMillions.numbers
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

  res.json({
    winningNumbers: winningMegaMillions.numbers,
    megaBall: winningMegaMillions.megaball,
    userNumbers: userNumbers.slice(0, 5),
    userMegaBall: userNumbers[5],
    prize,
  });
};

module.exports = {
  checkLottery,
};
