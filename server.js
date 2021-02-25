const express = require('express');
const path = require('path');

// Set up app
const port = 4070;
const app = express();

// Set up ejs engine and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up api links

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/settings', (req, res) => {
    res.render('settings');
});

app.get('/user', (req, res) => {
    res.render('user');
});

app.get('/stats', (req, res) => {
    res.render('stats');
});

app.get('/login', (req, res) => {
    
    res.render('login');
});

app.get('logoff', (req, res) => {
    // add functionality for to log off
    res.redirect('/');
});


// Start app
app.listen(port, console.log('App is running on port ' + port));