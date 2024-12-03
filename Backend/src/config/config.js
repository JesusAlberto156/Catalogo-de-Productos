import dotenv from 'dotenv';
const { DB_PORT, DB_API_URL, DB_URL, DB_USER, DB_PASSWORD, DATABASE } = require('../../credentials/credentials');

dotenv.config();

export default {
    HOST: process.env.HOST || 'NO ENCONTRO VAR ENTORNO',
    PORT: process.env.DB_PORT || DB_PORT,
    API_URL: process.env.API_URL || DB_API_URL,
    CONNECTION_STRING: process.env.CONNECTION_STRING || DB_URL,
    DATABASE: process.env.DATABASE || DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD || DB_PASSWORD,
    DB_USER: process.env.DB_USER || DB_USER,
}