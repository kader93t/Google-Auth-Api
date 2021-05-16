const express = require('express');
const Mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const dotenv = require('dotenv');
const db_connect = require('./src/db/db_connect');
const passportConfig = require('./config/passport');
const authRouter = require('./src/routes/auth');
const homeRouter = require('./src/routes/home');

dotenv.config({
  path: './config/config.env',
});

db_connect();
const app = express();
app.use(
  session({
    name: 'xsid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(homeRouter);
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.listen(process.env.PORT, () => {
  console.log(
    `Server is runing in ${process.env.NODE_ENV.toUpperCase()} on port ${
      process.env.PORT
    }`
  );
});
