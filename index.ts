const mongoose = require('mongoose');
;const mongoDB = "mongodb://localhost:27017/brands_database";


async function transformData() {
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
}

transformData();
