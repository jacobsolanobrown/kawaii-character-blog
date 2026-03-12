import { pool } from '../config/database.js';

const getCharacters = async (req, res) => {
  try {
    console.log('Getting characters from the database...');
    const results = await pool.query(
      'SELECT * FROM characters ORDER BY id ASC',
    );
    console.log('Characters retrieved successfully LOL:', results.rows);
    res.status(200).json(results.rows);
    console.log('Response sent successfully');
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getCharacters
}