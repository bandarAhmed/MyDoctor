const express = require('express');
require('dotenv').config();
const router = require('./router/router');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./modules/db');
const models = require('./modules');

// to run the server
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json())

app.use('/', router)

app.use((req, res, next)=> {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
});

app.use((error, req, res, next)=> {
    res.status(error.status || 500)
    res.json({message: error.message})
});


db.sync()

const port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log('Listening on port' + ' ' + port)
})