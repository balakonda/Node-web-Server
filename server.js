const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (txt) => {
	return txt.toUpperCase();
});

app.set('View Engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now} ${req.method} ${req.url}`);
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {

        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.get('/', (req, res) => {
    //console.log(req);
    //console.log(res);
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
    	welcomeNote: 'Welcome to Weather App',
    	pageTitile: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
    	pageTitile: 'About'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'It Fails'
    });
});

app.listen(3000, () => {
	console.log('Server is ---> 3000');
});