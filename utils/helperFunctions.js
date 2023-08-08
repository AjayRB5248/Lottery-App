const winningNumbers = {
  megamillions: {
    numbers: [11, 30, 45, 52, 56],
    megaball: 20,
    megaplier: 2,
  },
  powerball: {
    numbers: [11, 30, 45, 52, 56],
    powerball: 20,
  },
};

function compareNumbers(userNumbers, winningNumbers) {
  let matchedNumbers = 0;
  for (const number of userNumbers) {
    if (winningNumbers.includes(number)) {
      matchedNumbers++;
    }
  }
  return matchedNumbers;
}

function checkMegaBall(userMegaBall, winningMegaBall) {
  return userMegaBall === winningMegaBall;
}

module.exports = {
  winningNumbers,
  compareNumbers,
  checkMegaBall,
};
