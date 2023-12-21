const express = require('express');
const { readFileSync } = require('fs');
const path = require('path')
const app = express();
const port = 3000;
const { parse } = require('node-html-parser');



// Custom middleware to check if it's working hour
const workingHourMiddleware = (req, res, next) => {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();

    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next() // continue to the next middleware or route handler
    } else {
        res.send('The web application is only available during working hours(Monday to Friday, from 9 to 17).')
    }
}

//using the middleware for all route
app.use(workingHourMiddleware);
app.set('view engine', 'ejs');
app.use(express.static('public'));
console.log(__dirname);
app.get('/', (req, res,) => {
    const homeHTML = readFileSync("views/home.ejs", 'utf8',)
    const root = parse(homeHTML)
    res.render('home');
})

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})