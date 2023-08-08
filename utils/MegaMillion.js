function calculateMegaMillion(matchedDigits, hasMegaBall, megaplier) {
  if (matchedDigits === 5 && hasMegaBall) {
    prize = {
      result: true,
      headings: "Jackpot!",
      matchedNumbers: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: true,
      amount: jackpotAmount,
    };
  } else if (matchedDigits === 5) {
    prize = {
      result: true,
      headings: "Match 5 numbers without Mega Ball: $1,000,000",
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: false,
      win: "1,000,000",
    };
  } else if (matchedDigits === 4 && hasMegaBall) {
    prize = {
      result: true,
      headings: `Match 4 numbers + Mega Ball: $10,000 x ${megaplier} = $${
        10_000 * megaplier
      }`,
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: true,
      win: `${10_000 * megaplier}`,
    };
  } else if (matchedDigits === 4) {
    prize = {
      result: true,
      headings: "Match 4 numbers without Mega Ball: $500",
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: false,
      win: `500`,
    };
  } else if (matchedDigits === 3 && hasMegaBall) {
    prize = {
      result: true,
      headings: `Match 3 numbers + Mega Ball: $200 x ${megaplier} = $${
        200 * megaplier
      }`,
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: true,
      win: `500`,
    };
  } else if (matchedDigits === 3) {
    prize = {
      result: true,
      headings: "Match 3 numbers without Mega Ball: $10",
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: false,
      win: `10`,
    };
  } else if (matchedDigits === 2 && hasMegaBall) {
    prize = {
      result: true,
      headings: `Match 2 numbers + Mega Ball: $10 x ${megaplier} = $${
        10 * megaplier
      }`,
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: true,
      win: `${10 * megaplier}`,
    };
  } else if (matchedDigits === 1 && hasMegaBall) {
    prize = {
      result: true,
      headings: `Match 1 number + Mega Ball: $4 x ${megaplier} = $${
        4 * megaplier
      }`,
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: true,
      win: `${4 * megaplier}`,
    };
  } else if (hasMegaBall) {
    prize = {
      result: true,
      headings: `Mega Ball matched: $2 x ${megaplier} = $${2 * megaplier}`,
      matched: matchedDigits,
      megaplier: megaplier,
      isMegaplierMatched: true,
      win: `${2 * megaplier}`,
    };
  } else {
    prize = {
      result: false,
      headings: `Sorry, you did not win this time.`,
      matched: 0,
      megaplier: megaplier,
      isMegaplierMatched: false,
      win: "0",
    };
  }

  return prize;
}

module.exports = { calculateMegaMillion };
