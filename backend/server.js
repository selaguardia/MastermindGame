const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const fetch = require("node-fetch");

// Middleware
// app.use(express.urlencoded({ extended: false })); // Body parser
// app.use(express.static("public"));

const apiURL =
  "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";

app.get("/", async (req, res) => {
  try {
    const randomNumbersAPI = await fetch(apiURL)
      .then((res) => res.text())
      .then((data) => {
        return data.split("\n");
      });
      res.send(randomNumbersAPI);
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log(`✅ Listening for client requests on Port ${PORT} ✅`);
});
