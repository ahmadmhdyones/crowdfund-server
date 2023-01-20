import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import Campagin from './models/campaignModel.js';
import Contribution from './models/contributionModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    console.log('✅ Data Imported!'.green);
    process.exit();
  } catch (error) {
    console.error(`🛑 Error! ${error.message.bold}`.red.inverse, error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Campagin.deleteMany();
    await Contribution.deleteMany();

    console.log('⭕ Data Destroyed!'.red);
    process.exit();
  } catch (error) {
    console.error(`🛑 Error! ${error.message.bold}`.red.inverse, error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
