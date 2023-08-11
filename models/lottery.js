const mongoose = require('mongoose');

const megamillionResultSchema = new mongoose.Schema({
  drawDate: { type: Date, unique: true },
  nextDrawDate: { type: Date, unique: true },
  jackpot: Number,
  allNumber: [Number],
  winningNumber: { type: [Number], unique: true },
  megaball: Number,
  megaplier: Number,
});

const powerballResultSchema = new mongoose.Schema({
  drawDate: { type: Date, unique: true },
  nextDrawDate: { type: Date, unique: true },
  jackpot: Number,
  allNumber: [Number],
  winningNumber: { type: [Number], unique: true },
  powerball: Number,
  powerplay: Number,
});

const PowerballResult = mongoose.model(
  'PowerballResult',
  powerballResultSchema
);

const MegamillionResult = mongoose.model(
  'MegamillionResult',
  megamillionResultSchema
);

module.exports = { MegamillionResult, PowerballResult };
