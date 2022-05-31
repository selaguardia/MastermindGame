const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: false })); // Body parser
app.set("view engine", "ejs");
app.use(express.static("public"));


app.use('/home', require('./backend/routes/homeRoute'));

app.listen(PORT, () => {
  console.log(`✅ Listening for client requests on Port ${PORT} ✅`)});