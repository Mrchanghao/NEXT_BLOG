const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 8000;

const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
// app 
const app = express();

//db
mongoose.connect(process.env.DB_CLOUD, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log(`DB_CLOUD connect`))

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());

// cors
app.use(cors({origin: `${process.env.CLIENT_URL}`}));

//router
app.use('/api', blogRouter)
app.use('/api', authRouter)
app.use('/api', userRouter)
// server

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})