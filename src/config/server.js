class Server {
  constructor(app) {
    this.app = app
  }

  async connecte(db) {
    try {
      // await db.associateAll(db.sequelize.models)
      await db.sequelize.sync()
    } catch (err) {
        console.error(err)
    }
  }

  middlewares(middlewares) {
    for(let key in middlewares){
      this.app.use(middlewares[key])
    }
  }

  routes(routes) {
    for(let path in routes){
      this.app.use(path, routes[path])
    }
  }

  errorHandler(errorHandler) {
    this.app.use(errorHandler)
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`[App]: Listening on PORT ${port}`)
    })
  }

}

export default Server
