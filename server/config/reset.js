// this file will create the characters table in the database
import { pool } from './database.js';
import './dotenv.js';
import characterData from '../data/characters.js';

const createCharactersTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS characters;

    CREATE TABLE IF NOT EXISTS characters (
      id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        rating VARCHAR(2) NOT NULL,
        rating_description TEXT NOT NULL,
        ranking_date VARCHAR(255) NOT NULL
    );
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log('Characters table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } // dont call finally as it will close the connection to the database and we 
  // need it to insert the data into the table
  // } finally {
  //   await pool.end(); // is this needed?
  // }
};

const seedCharactersTable = async () => {
  await createCharactersTable(); // WHAT IS THIS FOR - we dont create the new function

  // traverse the characterData
  characterData.characters.forEach((character) => {
    // make a query to insert the character data into the characters table
    const insertQuery = {
      // the values are for the title, image, description, rating, rating_description, and ranking_date columns in the characters table
      // they are defined as $1, $2, $3, $4, $5, and $6 respectively, which are placeholders for the actual values that will be inserted into the table later
      text: 'INSERT INTO characters (title, image, description, rating, rating_description, ranking_date) VALUES ($1, $2, $3, $4, $5, $6)',
    };

    // this the values of the character data that we want to insert
    // into the characters table. We use the properties of the character object
    // to populate the values array.
    const values = [
      character.title,
      character.image,
      character.description,
      character.rating,
      character.ratingDescription,
      character.rankingDate,
    ];

    // this is a callback function that is called after the query is
    //  executed. If there is an error, it logs the error to the console.
    //  If the query is successful, it logs a success message to the console.
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting character', err);
        return;
      }
      console.log(`✅ ${character.title} added successfully`);
    });
  });           
};

seedCharactersTable();
