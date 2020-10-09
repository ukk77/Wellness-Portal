const express = require('express');
const mongoose = require('mongoose');
const signup = require('./routes/api/signup')
const config = require('config');

const app = express();

app.use(express.json());

const db = config.get('mongoURI')

mongoose.
connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("mongo connected"))
.catch(err => console.log(err))

app.use('/api/signup', signup)
app.use('/api/auth', require('./routes/api/auth'))                                              

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));