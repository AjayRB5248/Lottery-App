const dotenv = require("dotenv");
dotenv.config();
const resultMock = require("./resultMock.json");
const API_KEY = process.env.X_Rapidapi_Key;
const host = process.env.X_Rapidapi_Host;

//PLEASE USE resultMock.json FOR JSON PARSING, WE HAVE LIMITED API REQUEST
// module.exports = {
async function getLottery(state) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": host,
    },
  };
  const response = await fetch(
    `https://lottery-results.p.rapidapi.com/games-by-state/us/${state}`,
    options
  );
  //const results = await response.json();
  const results = resultMock;
  // console.log(results);
  // const powerballResults = results[0];
  const megamillionsResults = results[1];

  //For Megamillion API response is of INDEX 1

  const megaMillionDraws = megamillionsResults.plays[0].draws[0];
  const drawDate = new Date(megaMillionDraws.date);
  const nextDrawDate = new Date(megaMillionDraws.date);
  const jackpot = megaMillionDraws.nextDrawJackpot;
  console.log(drawDate);

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

  //Remove the console logs on production
  console.log("All Lottery Number: ", mmLotteryNumber);
  console.log("Winning Number:", mmWinningNumber);
  console.log("Mega Ball: ", megaball);
  console.log("MegaPlier: ", megaplier);

  //THESE PAYLOAD SHOULD BE STORED IN Database, with unique validator present, so no duplicate data.
  const payload = {
    jackpot: jackpot,
    drawDate: drawDate,
    nextDrawDate: nextDrawDate,
    allNumber: mmLotteryNumber,
    winningNumber: mmWinningNumber,
    megaball: megaball,
    megaplier: megaplier,
  };

  //You Need to work on for Powerball and MegaMillion Both
  return payload;

  /* EXAMPLE PAYLOAD IF DOING PB AND MM 
  const examplePayload = {
    megamillion: {
      jackpot: jackpot,
      drawDate: drawDate,
      nextDrawDate: nextDrawDate,
      allNumber: mmLotteryNumber,
      winningNumber: mmWinningNumber,
      megaball: megaball,
      megaplier: megaplier,
    },
    powerball: {
      jackpot: jackpot,
      drawDate: drawDate,
      nextDrawDate: nextDrawDate,
      allNumber: pbLotteryNumber,
      winningNumber: pbWinningNumber,
      powerball: powerball,
      powerplay: powerplay,
    },
  };
  */
}
// };

getLottery("tx");
