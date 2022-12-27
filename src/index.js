const express = require("express");
const app = express();
require("./connection");
require("dotenv").config();
const Routes = require('./routes');
const cors = require("cors")

if(!process.env.MONGODB_CONNECTION_URL){
  console.log("FATAL ERROR: MONGODB CONNECTION STRING IS NOT DEFINED.");
  process.exit(1);
}

const hostname = "127.0.0.1";
const port = 3001;

app.use(
  cors({
    origin:"*"
  })
)

app.get("/", (req, res) => {
  res.send("App is Working");
});

app.use(express.json());
app.use('/api', Routes)

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
