const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prashant Bhattarai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prashant Bhattari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Prashant Bhattarai'
    })
})

app.get('/weather', async(req, res) => {

    try{
        const location = req.query.location;
        const {longitude,latitude,placeName} = await geocode(location);
        const {temperature, name, cloud_percent} = await forecast(latitude,longitude);
        res.send({
            forecast: `In ${placeName}, It is ${temperature} degree celcius and ${cloud_percent} % of clouds`,
            location: name,
            address: placeName
            
        });

    }catch(Err){
        console.log(Err);
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prashant Bhattarai',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})


app.listen(5000, () => {
    console.log('Server is up and running in port 5000');
})
// module.exports = app;
