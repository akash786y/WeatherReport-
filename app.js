const express = require('express')
const https = require('https')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {

    // res.send(45)
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {

    const query = req.body.cityName
    const appKey = 'a356e2b1d70839bba60de4e2c437e38e'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + appKey + '&units=metric'

    https.get(url, (responce) => {

        responce.on('data', (data)=> {
            // const weatherData = JSON.parse(data)
            // console.log(weatherData)
            // const temp = weatherData.main.temp
            // const weatherDesc = weatherData.weather[0].description
            // const icon = weatherData.weather[0].icon
            // const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            // res.write('<h1>The weather is ' + weatherDesc + ' currrently</h1>')
            // res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>")
            // res.write("<img src=" + imgURL + ">")
            // res.send()


            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write('<!DOCTYPE html>');
            res.write('<html lang="en">');
            res.write('<head>');
            res.write('<meta charset="UTF-8">');
            res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
            res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
            res.write('<title>Weather App</title>');
            res.write('</head>');
            res.write('<body>');

            // Navbar
            res.write('<nav class="navbar navbar-expand-lg navbar-light bg-light">');
            res.write('<a class="navbar-brand" href="#">Weather App</a>');
            res.write('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">');
            res.write('<span class="navbar-toggler-icon"></span>');
            res.write('</button>');
            res.write('<div class="collapse navbar-collapse" id="navbarNav">');
            res.write('<ul class="navbar-nav ml-auto">');
            res.write('<li class="nav-item active">');
            res.write('<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>');
            res.write('</li>');
            res.write('</ul>');
            res.write('</div>');
            res.write('</nav>');

            res.write('<div class="container mt-5">');
            res.write('<div class="jumbotron text-center bg-warning text-white">');
            res.write('<h1 class="display-4">Weather in ' + query + '</h1>');
            res.write('<p class="lead">The weather is currently: ' + weatherDesc + '</p>');
            res.write('<p class="lead">The temperature is: ' + temp + '°C</p>');
            res.write('<img src="' + imgURL + '" alt="Weather Icon" class="img-fluid">');
            res.write('</div>');
            res.write('</div>');

            // Include Bootstrap JavaScript and jQuery scripts
            res.write('<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>');
            res.write('<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>');
            res.write('<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');

            res.write('</body>');
            res.write('</html>');

            res.send();
        })
    })

    // res.send('This is home page')
})

// const city='London'
// const appKey='a356e2b1d70839bba60de4e2c437e38e'
// const url='https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid='+ appKey +'&units=metric'

// https.get(url,(responce)=>{

//     responce.on('data',function(data){
//         const weatherData=JSON.parse(data)
//         console.log(weatherData)
//         const temp=weatherData.main.temp
//         const weatherDesc=weatherData.weather[0].description
//         const icon=weatherData.weather[0].icon
//         const imgURL="http://openweathermap.org/img/wn/" + icon+ "@2x.png"
//         res.write('<h1>The weather is ' + weatherDesc + ' currrently</h1>')
//         res.write("<h1>The temperature in London is " + temp + " degrees Celcius</h1>")
//         res.write("<img src=" + imgURL +">")
//         res.send()
//     })
// })

// res.send('This is home page')



app.listen(3000, () => {
    console.log("Server is running on Port 3000")
})