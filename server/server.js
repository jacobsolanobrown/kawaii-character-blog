import express from 'express'
import './config/dotenv.js'
import characterRouter from './routes/characters.js'

const app = express()

// this is the middlware function line that serves our static files (html, css, js) for the public folder
app.use('/public', express.static('./public')) 
// exposes the public folder to the client so they can access the files in it (html, css, js) with the url http://localhost:3000/public/filename.ext

// this line serves our static files (html, css, js) for the scripts folder
app.use('/scripts', express.static('./public/scripts'))

// this line mounts the characterRouter at the /characters path, so any requests to http://localhost:3000/characters will be handled by the characterRouter
app.use('/characters', characterRouter)

/// this sends a response to the client when they request the root url of the server (http://localhost:3000/)
// defines a route url of the server with parameters req and res (this shows up on the server)
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Kawa-Chars API</h1>')
})

// status 200 means the request was successful and the server is sending back the requested data


// start a server on the port 3000 and log a message to the console when the server is running
const PORT = process.env.PORT || 3001
    
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})


