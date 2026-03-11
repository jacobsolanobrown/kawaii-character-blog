// this file will create the characters table in the database 
import { pool } from './database.js'
import "./dotenv.js"
import charactersData from '../data/characters.js'

const createTableQuery = `
DROP TABLE IF EXISTS characters;

CREATET TABLE IF NOT EXISTS characters (
  id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    rating VARCHAR(2) NOT NULL,
    rating_description TEXT NOT NULL,
    ranking_date VARCHAR(255) NOT NULL
);
`

try {
  const res = await pool.query(createTableQuery)
  console.log('Table created successfully')
} catch (err) {
  console.error('Error creating table:', err)
} finally {
  await pool.end() // is this needed? 
}