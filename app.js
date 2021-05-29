const express = require('express');
const { PORT } = require('./config');

var pino = require('express-pino-logger')()

const app = express();

app.use(express.json())
app.use(require('./api'));

app.listen(PORT,err=>{
    if(err) {
        console.log(err);
    }
    console.log('Server Started on PORT 5000')
})
