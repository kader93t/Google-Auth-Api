const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'sessions',
});

module.exports = {
  session,
  store: mongoStore,
};
