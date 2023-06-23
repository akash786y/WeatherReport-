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
            const weatherData = JSON.parse(data)
            // console.log(weatherData)
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write('<h1>The weather is ' + weatherDesc + ' currrently</h1>')
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>")
            res.write("<img src=" + imgURL + ">")
            res.send()
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
    console.log("Server is up and running")
})