import { Express, Application } from 'express'
import config  from "./constant";


class Server {
  app: Application
  constructor(app: Application) {
    this.app = app;
  }

  async connecte(db: any) {
    try {
      // await db.associateAll(db.sequelize.models)
      await db.connect();
      console.log('[App]: Connected to Bdd');
    } catch (err) {
      console.log(err);
    }
  }

  middlewares(middlewares: any) {
    for (const key in middlewares) {
      this.app.use(middlewares[key]);
    }
  }

  routes(routes: any) {
    for (const path in routes) {
      this.app.use(`${config.API_VERSION}${path}`, routes[path]);
      }
  }

  errorHandler(errorHandler: any) {
    this.app.use(errorHandler);
  }

  start(port: any) {
    this.app.listen(port, () => {
      console.log(`[App]: Listening on PORT ${port}`);
    });
  }
}

export default Server;
