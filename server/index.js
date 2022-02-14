import express from 'express';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import MongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

import database from '../config/database.js';
import Router from '../router/index.js';

class Server {
  constructor() {
    this.router = Router;
    this.port = process.env.PORT;
    this.database = database;
    this.app = express();
    this.app.use(helmet());
    this.app.use(MongoSanitize());
    this.app.use(xss());
  }

  start() {
    this.database();
    this._RequestsLimiter();
    this._setupRoutes();
    this._listen();
  }

  _RequestsLimiter() {
    const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Sorry, you have made too many requests. Please try again later',
    });
    this.app.use('/api', limiter);
  }

  _setupRoutes() {
    this.router.create(this.app);
  }

  _listen() {
    this.app.listen(this.port, () => {
      console.log(`App is running on port ${this.port} 👌`);
    });
  }
}

export default Server;
