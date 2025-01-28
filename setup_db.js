import sqlite3 from 'sqlite3';

global.db = new sqlite3.Database('sklep.db')


import pg from 'pg';
const { Client } = pg
const client = new Client({database: 'taco'})
await client.connect()
 
const res = await client.query('SELECT * FROM Employees')
for(const row of res.rows) {
    console.log(row)
}
await client.end()