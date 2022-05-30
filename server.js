const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 4000;


// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(PORT, () => {
  console.log(`✅ Listening for client requests on Port: ${PORT} ✅`);
})