import pg from 'pg'
// in node / postgresql, pg is the postgreSQL client library

// conection pool is an easy to connect ot a postgres database 
// this is a cache of connections to easiy coonect to the database and reuse them instead of 
// being opend and close for each database transaction 


// var to connect to the database 
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
      rejectUnauthorized: false
  }
}

export const pool = new pg.Pool(config)