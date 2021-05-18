import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use('/', express.static(path.join(__dirname, 'static')))
app.use('/mps/', express.static(path.join(__dirname, '../data/mps')))

app.use('/mps/index.json', (req, res) => {
  fs.readdir(path.join(__dirname, '../data/mps'), (err, files) => {
    res.json(files)
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${listener.address().port}`)
})
