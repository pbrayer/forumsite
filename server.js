const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./api');
const mongoose = require('mongoose');

// Requiring env 
require('dotenv').config({ path: 'sample.env' });

// HelmetJS
const helmet = require('helmet');
app.use(helmet());

// Session
const session = require('express-session');
app.use(session({ secret: process.env.SECRET }));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/reddit", { useNewUrlParser: true });

// Connect to the Mongo DB
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log("failed")
  console.log(err.message);
});



// Serving the final build file from React/build
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use('/api/', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('We have a server running on PORT: ' + PORT);
});
