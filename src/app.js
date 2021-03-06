const express =  require('express')
const path =  require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port  = process.env.PORT || 3000

//Define paths for Express cnfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Orlando'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About Me",
        location: "Meteora",
        name: "Orlando"
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        message: 'For more info please contact Orlando',
        name: 'Orlando'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide the address as a parameter',
            example: '/weather?address=yourHomeTown' 
        })
    }

    geocode(req.query.address, (errorGeo, {location, coordinates} = {}) =>{
        if (errorGeo){
            return res.send([{
                error: errorGeo
            }])
        }else{
            forecast(coordinates, (errorForecast, {temperatureLow, temperature, temperatureMax, precipitation}) =>{
                if (errorForecast){
                    return res.send([{
                        error: errorForecast
                    }])
                }else if (!temperature){
                    return res.send([{
                        error: 'Provide a more specific address'
                    }])
                }else{                    
                    res.send([{
                        title: "Current weather",
                        location: location,
                        temperatureLow: temperatureLow,
                        temperature: temperature,
                        temperatureMax: temperatureMax,
                        precipitation: precipitation
                     }])
                }
            })
        }

    })
})

app.get('/products', (req, res) => {
    req.query
    res.send({
        products: []
    })
})

//app.com
//app.com/help
//app.com/about

//Handle pages that does not exist (e.g. app.com/me)
app.get('/help/*', (req, res) =>{
    res.render('errors', {
        rootLocation: '/help',
        solution: 'Try /help'
    })
})

app.get('/about/*', (req, res) =>{
    res.render('errors', {
        rootLocation: '/about',
        solution: 'Try /about'
    })
})

app.get('/weather/*', (req, res) =>{
    res.render('errors', {
        rootLocation: '/weather',
        solution: 'Try /weather'
    })
})


app.get('*', (req, res) => {
    res.render('errors', {
        rootLocation: '/app',
        solution: 'Try /help, /about, /weather'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})