const express = require('express');
const db = require('./models/index');
const { PORT } = require('./config');

var pino = require('express-pino-logger')()

const app = express();

app.use(express.json())
app.use(require('./api'));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to bukitvista app." });
  });

app.listen(PORT,err=>{
    if(err) {
        console.log(err);
    }
    console.log('Server Started on PORT 5000')
})

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });