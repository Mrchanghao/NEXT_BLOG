const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 8000;

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
// app 
const app = express();

//db
mongoose.connect(process.env.DB_LOCAL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log(`DB_LOCAL connect`))

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());

// cors
app.use(cors({origin: `${process.env.CLIENT_URL}`}));

//router
app.use('/api', blogRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
// server

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})