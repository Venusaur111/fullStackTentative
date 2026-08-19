import pkg from 'pg';
import dotenv from 'dotenv';
import * as process from "node:process";

dotenv.config();

export const { Pool } = pkg;

export const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 36000,
})

dbPool.on('connect', () => {
    console.log('Successfully connected to the database');
})
dbPool.on('error', err => {
    console.error('Unexepted error on idle client', err.stack);
});