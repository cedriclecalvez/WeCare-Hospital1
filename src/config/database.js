import { Sequelize } from 'sequelize'
import config from "./constant"

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  dialect: config.DB_DIALECT, 
  port: config.DB_PORT, 
  host: config.DB_HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const associateAll = async (models) => {
  Object.values(models).map((model) => model.associate(models));
}

const db = { sequelize, associateAll }

export default db