import config  from "./constant";

class Server {
  constructor(app) {
    this.app = app;
  }

  async connecte(db) {
    try {
      // await db.associateAll(db.sequelize.models)
      await db.sequelize.sync();
      console.log('[App]: Connected to Bdd');
    } catch (err) {
      console.error(err);
    }
  }

  middlewares(middlewares) {
    for (const key in middlewares) {
      this.app.use(middlewares[key]);
    }
  }

  routes(routes) {
   

    for (const path in routes) {
      this.app.use(`${config.API_VERSION}${path}`, routes[path]);
    }
  }

  errorHandler(errorHandler) {
    this.app.use(errorHandler);
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`[App]: Listening on PORT ${port}`);
    });
  }
}

export default Server;
