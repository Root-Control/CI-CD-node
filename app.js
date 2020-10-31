const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!' + process.env.NODE_ENV + ' ' + process.env.AWS);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}, ${process.env.NODE_ENV}`)
})