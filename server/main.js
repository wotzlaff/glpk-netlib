const express = require('express')
const fs = require('fs')
const app = express()

app.use('/', express.static('./static'))
app.use('/mps/', express.static('../data/mps'))

app.use('/mps/index.json', (req, res) => {
  fs.readdir('../data/mps', (err, files) => {
    res.json(files)
  })
})

app.listen(3000)
