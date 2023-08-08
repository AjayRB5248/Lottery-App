const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const lotteryRoute = require('./routes/checkLottery');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/lottery', lotteryRoute);
app.use('/api/auth', authRoutes);
const port = 3001;

mongoose
  .connect(
    'mongodb+srv://megamillion:megamillion@cluster0.dxoonb3.mongodb.net/'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.send('Server Started ...');
});
