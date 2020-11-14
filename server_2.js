const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

//server for the entire project
app.use(express.json());
app.use(cookieParser());
app.use(cors())

const db = config.get('mongoURItest')

//connecting to mongo db atlas
mongoose.
connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("mongo connected"))
.catch(err => console.log(err))

//handling access to user route/api's
const userRouter = require('./routes/User')
app.use('/user', userRouter)

//handling access to doctor route/api's
const doctorRouter = require('./routes/doctors')
app.use('/doctors', doctorRouter)

//handling access to the appointment route/api's
const appointmentRouter = require('./routes/appointment')
app.use('/appointment', appointmentRouter)

//select port and listen on port for any requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));