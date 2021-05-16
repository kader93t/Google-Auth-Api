const mongoose = require('mongoose');

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to database on ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connect;
