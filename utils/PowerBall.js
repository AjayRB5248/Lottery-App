function calculatePowerball(matchedNumbers, hasPowerball, powerPlay, jackpot) {
  let prize;

  if (matchedNumbers === 5 && hasPowerball) {
    prize = {
      result: true,
      headings: "Jackpot!",
      matchedNumbers: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: true,
      amount: jackpot,
    };
  } else if (matchedNumbers === 5) {
    prize = {
      result: true,
      headings: "Match 5 numbers without Powerball: $1,000,000",
      matched: matchedNumbers,
      powerPlay: powerPlay,
      win: "1,000,000",
    };
  } else if (matchedNumbers === 4 && hasPowerball) {
    prize = {
      result: true,
      headings: `Match 4 numbers + Powerball: $50,000 x ${powerPlay} = $${
        50_000 * powerPlay
      }`,
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: true,
      win: `${50_000 * powerPlay}`,
    };
  } else if (matchedNumbers === 4) {
    prize = {
      result: true,
      headings: "Match 4 numbers without Powerball: $100",
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: false,
      win: `100`,
    };
  } else if (matchedNumbers === 3 && hasPowerball) {
    prize = {
      result: true,
      headings: `Match 3 numbers + Powerball: $100 x ${powerPlay} = $${
        100 * powerPlay
      }`,
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: true,
      win: `${100 * powerPlay}`,
    };
  } else if (matchedNumbers === 3) {
    prize = {
      result: true,
      headings: "Match 3 numbers without Powerball: $7",
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: false,
      win: `7`,
    };
  } else if (matchedNumbers === 2 && hasPowerball) {
    prize = {
      result: true,
      headings: `Match 2 numbers + Powerball: $7 x ${powerPlay} = $${
        7 * powerPlay
      }`,
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: true,
      win: `${7 * powerPlay}`,
    };
  } else if (matchedNumbers === 1 && hasPowerball) {
    prize = {
      result: true,
      headings: `Match 1 number + Powerball: $4 x ${powerPlay} = $${
        4 * powerPlay
      }`,
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: true,
      win: `${4 * powerPlay}`,
    };
  } else if (hasPowerball) {
    prize = {
      result: true,
      headings: `Powerball matched: $4 x ${powerPlay} = $${4 * powerPlay}`,
      matched: matchedNumbers,
      powerPlay: powerPlay,
      isPowerPlayMatched: true,
      win: `${4 * powerPlay}`,
    };
  } else {
    prize = {
      result: false,
      headings: `Sorry, you did not win this time.`,
      matched: 0,
      powerPlay: powerPlay,
      isPowerPlayMatched: false,
      win: "0",
    };
  }

  return prize;
}

function comparePowerballNumbers(
  userNumbers,
  userPowerball,
  winningPowerballNumbers
) {
  let matchedNumbers = 0;
  for (const number of userNumbers) {
    if (winningPowerballNumbers.winningNumber.includes(number)) {
      matchedNumbers++;
    }
  }

  const hasPowerball = userPowerball === winningPowerballNumbers.powerball;

  return {
    matchedNumbers: matchedNumbers,
    hasPowerball: hasPowerball,
  };
}

module.exports = {
  calculatePowerball,
  comparePowerballNumbers,
};
