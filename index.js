const express = require("express");
const { calculateMegaMillion } = require("./MegaMillion");
const { getLottery } = require("./getLottery");
const app = express();

/*

For Megamillion: https://www.megamillions.com/How-to-Play.aspx#:~:text=Mega%20Millions%C2%AE%20tickets%20cost,winning%20numbers%20in%20a%20drawing.
For Powerball: https://www.powerball.com/

Use this for test cases, Actual data can be taken from the DB or getLottery();
getLottery will return a similar payload with winning numbers and jackpot amount

const winningNumber = await getLottery('state') // do 'tx'
*/
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

/* Doing a GET Request to check the user number from API */
app.get("/mm/q", async (req, res) => {
  //  /mm/q/q?userNumber=10,20,30,40,50,60
  const userNumbers = req.query.userNumber.trim().split(",").map(Number);
  const winningMegaMillions = winningNumbers.megamillions;

  if (userNumbers.length !== 6 || userNumbers.some(isNaN)) {
    res.status(400).json({
      error: "Invalid input. Please provide 6 numbers separated by commas.",
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
});

/*
You need to create an endpoint for Powerball 
Create multiple page for diffrent endpoint.
Don't jam everything on index

example powerball endpoint
/pb/q?userNumber=

*/

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
