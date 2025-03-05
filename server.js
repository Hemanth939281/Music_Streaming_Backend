const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./db/connectdb');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const songRoute = require('./routes/songsRoute');
require('dotenv').config();

const app = express();
connectDb();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// User routes
app.use('/users', userRoute );
app.use('/songs', songRoute);


app.get('/', (req, res) => {
    res.send({msg: 'hello server is running'});
})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
})