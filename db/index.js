import pg from 'pg'

const { Client } = pg
const client = new Client({database: 'taco'})
await client.connect()

export const query = (text, params) => {
    console.log(`Got query: ${text} with params: ${params}`);
    return client.query(text);
}

