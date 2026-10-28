import mysql from 'mysql2';
import { database } from '../config/env';

const pool = mysql.createPool({
    ...database,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
});