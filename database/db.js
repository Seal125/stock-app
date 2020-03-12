const mongoose = require("mongoose");

const mongoDbURI = 'mongodb+srv://seal125:brasil125@stock-app-db-nzzfb.mongodb.net/test?retryWrites=true&w=majority';

const InitMongoServer = async () => {
  try {
    await mongoose.connect(mongoDbURI, {
      useNewUrlParser: true
    });
    console.log("Connection Success");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = InitMongoServer;