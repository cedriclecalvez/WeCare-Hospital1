import express from 'express';
// import the morgan library
import morgan from 'morgan';
// import the logger
import logger from './logger';
import cookieParser from 'cookie-parser';

const cors = require('cors');

// create a Morgan middleware instance
const morganMiddleware = morgan('combined', {
  // specify a function for skipping requests without errors
  skip: (req, res) => res.statusCode < 400,
  // specify a stream for requests logging
  stream: {
    write: (msg) => logger.http(msg),
  },
});

const middlewares = {
  apiLogger: morganMiddleware,
  json: express.json(),
  urlencoded: express.urlencoded({ extended: false }),
  cookie: cookieParser(),
  cors: cors({origin:'http://localhost:3000',credentials:true,exposedHeaders: 'Authorization'})
  // cors: cors({credentials:true,exposedHeaders: 'Authorization',})
};

export default middlewares;
