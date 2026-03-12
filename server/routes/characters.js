import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

import CharactersController from '../controllers/characters.js';

//  this allows us to use the fileURLToPath function to get the current file path
//  and then use that to get the directory name of the current file, which we can use to serve our static files and set up our routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set up the router
const router = express.Router();

// create a get route at the root of the router that sends the character data as a JSON response
// this is a response upon request to http://localhost:3000/characters/ (assuming this router is mounted at /characters in the main server file)
// router.get('/', (req, res) => {
//   // send the character data as a JSON response with a status of 200 (OK)
//   res.status(200).json(characterData)
// })

// here we use the controller and the controller takes care of the response status and
// the data that we send back to the client, so we just call the controller function and
// pass in the request and response objects
router.get('/', (req, res) => {
  console.log('Route hit: GET /characters/');
  CharactersController.getCharacters(req, res);
});

// // create another ger route at the /:characterId path that sends the data for a specific character based on the characterId parameter in the URL
// // this is a response upon request to http://localhost:3000/characters/:characterId (assuming this router is mounted at /characters in the main server file)
router.get('/:characterId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/character.html'));
});

export default router;
