import dotenv from 'dotenv'
dotenv.config()

const config = {
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_NAME: process.env.DB_NAME || 'hospital',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT) || 3306,
  PORT: process.env.PORT || 4001
}

export default config