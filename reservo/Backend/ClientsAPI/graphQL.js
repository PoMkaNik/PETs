const express = require('express');

const json = require('body-parser');

const graffiti = require('@risingstack/graffiti');

const schema = require('./models/graphQlSchema');

const config = require('./config'); // get our config file

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.database); // connect to database

const app = express();

app.use(json());

// console.log(schema);

app.use(graffiti.express({
  schema,
}));

// redirect all requests to /graphql
// to open GraphiQL by default
app.use((req, res) => {
  res.redirect('/graphql');
});

app.listen(3001, (err) => {
  if (err) {
    throw err;
  }

  console.log('Express server is listening on port 3001');
});
