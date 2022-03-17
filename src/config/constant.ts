import dotenv from 'dotenv';


dotenv.config();

//NODE_ENV = production
//NODE_ENV = development
// type nodeEnvType = 'development' | 'production';

//General
// export const NODE_ENV = (process.env.NODE_ENV as nodeEnvType) || 'development';
// export const __prod__ = NODE_ENV === 'production';

const config = {
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_NAME: process.env.DB_NAME || 'hospitalSequelize',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT as string) || 3309,
  PORT: process.env.PORT || 4001,
  JWT_SECRET: process.env.JWT_SECRET || 'yoursecretbBBFDBdcbdBb',
  API_VERSION: process.env.API_VERSION
};

export default config;
