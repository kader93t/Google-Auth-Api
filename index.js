require('./config/loadEnv');

const express = require('express');
const passport = require('passport');

const dbConnect = require('./src/db/db_connect');
const passportConfig = require('./config/passport');

const authRouter = require('./src/routes/auth');
const homeRouter = require('./src/routes/home');

const { session, store } = require('./src/middlware/session');

dbConnect();
const app = express();
app.use(
  session({
    name: 'xsid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(homeRouter);
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line import/no-extraneous-dependencies
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
