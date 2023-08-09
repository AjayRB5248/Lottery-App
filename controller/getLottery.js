const dotenv = require('dotenv');
dotenv.config();
const resultMock = require('../resultMock.json');
const API_KEY = process.env.X_Rapidapi_Key;
const host = process.env.X_Rapidapi_Host;

async function getLottery() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': host,
    },
  };
  // const response = await fetch(
  //   `https://lottery-results.p.rapidapi.com/games-by-state/us/tx`,
  //   options
  // );
  // const results = await response.json();
  const results = resultMock;
  const powerballResults = results[0];
  const megamillionsResults = results[1];
  const megaMillionDraws = megamillionsResults.plays[0].draws[0];
  const drawDate = new Date(megaMillionDraws.date);
  const nextDrawDate = new Date(megaMillionDraws.date);
  const jackpot = megaMillionDraws.nextDrawJackpot;

  const mmLotteryNumber = [];
  const mmWinningNumber = [];
  for (numbers of megaMillionDraws.numbers) {
    mmLotteryNumber.push(numbers.value);
  }
  for (let i = 0; i <= 4; i++) {
    mmWinningNumber.push(megaMillionDraws.numbers[i].value);
  }
  const megaplier = megaMillionDraws.numbers[6].value;
  const megaball = megaMillionDraws.numbers[5].value;

  const powerBallDraws = powerballResults.plays[0].draws[0];
  const pbdrawDate = new Date(powerBallDraws.date);
  const pbnextDrawDate = new Date(powerBallDraws.date);
  const pbjackpot = powerBallDraws.nextDrawJackpot;

  const pbLotteryNumber = [];
  const pbWinningNumber = [];
  for (numbers of powerBallDraws.numbers) {
    pbLotteryNumber.push(numbers.value);
  }
  for (let i = 0; i <= 4; i++) {
    pbWinningNumber.push(powerBallDraws.numbers[i].value);
  }
  const pbmegaplier = powerBallDraws.numbers[6].value;
  const pbmegaball = powerBallDraws.numbers[5].value;

  const MMpayload = {
    jackpot: jackpot,
    drawDate: drawDate,
    nextDrawDate: nextDrawDate,
    allNumber: mmLotteryNumber,
    winningNumber: mmWinningNumber,
    megaball: megaball,
    megaplier: megaplier,
  };
  const PBpayload = {
    jackpot: pbjackpot,
    drawDate: pbdrawDate,
    nextDrawDate: pbnextDrawDate,
    allNumber: pbLotteryNumber,
    winningNumber: pbWinningNumber,
    megaball: pbmegaball,
    megaplier: pbmegaplier,
  };

  return { MMpayload, PBpayload };
}

module.exports = {
  getLottery,
};
