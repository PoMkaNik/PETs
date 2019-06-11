const port = process.env.PORT || 8080;
const host = process.env.IP || 'localhost';

const path = require('path');

const express = require('express');

const app = express();
// const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  res.send('Get your credentials');
});

app.get('/registration', (req, res) => {
  res.render('registration');
});

app.post('/registration', (req, res) => {
  res.send('Get your details');
});

app.get('/dashboard', (req, res) => {
  res.send('Dash is there...');
});

app.listen(port, host, () => {
  console.log('ClientDashboard started!');
});
