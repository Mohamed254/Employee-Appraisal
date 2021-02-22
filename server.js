const path = require('path');
const express = require("express");
const connectDB = require("./config/db");
const colors = require('colors')
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const config = require("config");

const cookieParser = require('cookie-parser');


// Load env vars



//Connect Database
connectDB();


// Body parser








//init middleware
// app.use(express.json({ extended: false}));



// Route files
// const bootcamps = require('./routes/bootcamps');

const appraisal = require('./routes/appraisal');
const auth = require('./routes/auth');
const users = require('./routes/users');



const app = express();

// Body parser
app.use(express.json());


//init middleware
app.use(express.json({ extended: false}));


// Cookie parser
app.use(cookieParser());


// Dev logging middleware
if (config.get("NODE_ENV") === 'production') {
  app.use(morgan('dev'));
}


// File uploading
app.use(fileupload());


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Define Routes


// app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/appraisal", require("./routes/appraisal"));
app.use('/api/users',  require("./routes/users"));
// app.use("/api/waterprice", require("./routes/waterprice"));
// app.use("/api/reports", require("./routes/reports"));


// Mount routers


app.use(errorHandler);


const PORT = process.env.PORT || 7000;

const server = app.listen(
  PORT,
  console.log(
    `Server started on port ${PORT}`.yellow.bold
  )
);

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
