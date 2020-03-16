/*
This page connects to my MongoDB Atlas cluster, which is used to store user information (password is encrypted) to show relevant stock data
for them, such as past transactions.
*/

const mongoDbURI = 'mongodb+srv://seal125:{password-here}@stock-app-db-nzzfb.mongodb.net/test?retryWrites=true&w=majority';

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