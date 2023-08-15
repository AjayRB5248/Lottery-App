const User = require('../models/User');
const { MegamillionResult, PowerballResult } = require('../models/lottery');

const getUserHistory = async (req, res) => {
  try {
    const userId = req.user.token;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the latest 5 entries from the lotteryHistory array
    const latestLotteryHistory = user.lotteryHistory.slice(-5);

    res.status(200).json({ lotteryHistory: latestLotteryHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

const getLotteryHistory = async (req, res) => {
  try {
    const latestMmWinningNumber = await MegamillionResult.findOne({}).sort({
      _id: -1,
    });
    const latestPbWinningNumber = await PowerballResult.findOne({}).sort({
      _id: -1,
    });

    res.status(200).json({ latestMmWinningNumber, latestPbWinningNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lottery history' });
  }
};

module.exports = {
  getUserHistory,
  getLotteryHistory,
};
