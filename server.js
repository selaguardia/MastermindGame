const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 4000;


// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/game'));

app.listen(PORT, () => {
  console.log(`✅ Listening for client requests on Port: ${PORT} ✅`);
})