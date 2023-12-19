const express = require('express')

const app = express();
const port = 3000;


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

app.get('/', (req, res,) => {
    res.render('layout', { title: 'Home', content: '<%- include("home")%>' });
})

app.get('/services', (req, res) => {
    res.render('layout', { title: 'Our Services', content: '<%- include("services") %>' });
});

app.get('/contact', (req, res) => {
    res.render('layout', { title: 'Contact Us', content: '<%- include("contact") %>' });
});





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})