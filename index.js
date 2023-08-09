const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const lotteryRoute = require('./routes/checkLottery');
const authRoutes = require('./routes/authRoutes');
const userHistory = require('./routes/getUserHistory');
const app = express();
require('dotenv').config({ path: './.env' });
const authenticateToken = require('./middleware/auth');
const { getLottery } = require('./getLottery');
const { MegamillionResult, PowerballResult } = require('./models/lottery');

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/lottery', authenticateToken, lotteryRoute);
app.use('/api/user', authenticateToken, userHistory);
const port = 3001;

const DB = process.env.MONGODB_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

async function fetchLotteryData() {
  try {
    const state = 'tx';
    const { MMpayload, PBpayload } = await getLottery(state);
    console.log({ MMpayload, PBpayload });

    const megamillionResult = new MegamillionResult(MMpayload);
    const powerballResult = new PowerballResult(PBpayload);

    await megamillionResult.save();
    await powerballResult.save();

    console.log('Lottery data stored successfully.');
  } catch (error) {
    console.error('Error getting and storing lottery data:', error);
  }
}

// Call the function to fetch lottery data

app.get('/fetchLotteryData', fetchLotteryData);
app.get('/', (req, res) => {
  res.send('Server Started ...');
});
