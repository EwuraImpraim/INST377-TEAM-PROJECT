const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const express = require('express');
const { isValidStateAbbreviation } = require('usa-state-validator');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Initialize Supabase client
const supabaseUrl = 'https://jurpzuxdjdfhhltdbwid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cnB6dXhkamRmaGhsdGRid2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0ODc2OTEsImV4cCI6MjAzMTA2MzY5MX0.zniJyAUzeXhjdNyZwZFTXGZdZSnqTdIX6eeAL1GDsLU';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/data.html', { root: __dirname });
})

app.get('/supabase_data', async (req, res) => {
    // Retrieve weather data from Supabase database
    const { data, error } = await supabase
        .from('Weather_data')
        .select();

    if (error) {
        console.log('error');
        res.send(error);
    } else {
        res.send(data);
    }
    console.log('Data:', data);
})

app.get('/external_data', async (req, res) => {
    // Make request to external weather API
    const { zip } = req.query;
    const { country } = req.query;

    if (!zip) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

    if (!country) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }
    const weatherApiKey = '85c8c070fce59c34997ee62b789c4492';
    const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/zip?zip={zip},{country}&appid=${weatherApiKey}`;

    try {
        const geocodingResponse = await axios.get(geocodingApiUrl);
        const { lat, lng } = geocodingResponse.data.results[0].geometry;

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}`;

        const weatherResponse = await axios.get(weatherApiUrl);

        const extractedWeatherData = {
            temperature: weatherResponse.data.main.temp,
            humidity: weatherResponse.data.main.humidity,
            visibility: weatherResponse.data.visibility,
            description: weatherResponse.data.weather[0].description,
            windSpeed: weatherResponse.data.wind.speed,
            windGust: weatherResponse.data.wind.gust,
            sunrise: weatherResponse.data.sys.sunrise,
            sunset: weatherResponse.data.sys.sunset
        };

        // Write the extracted weather data to a JSON file
        fs.writeFile('formattedWeatherData.json', JSON.stringify(extractedWeatherData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Extracted weather data has been written to formattedWeatherData.json');
            }
        });
    } catch (error) {

        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log('APP IS ALIVEEE')
})


/*    console.log('Adding Data')
    console.log(req.body)
    var City = req.body.City;
    var State = req.body.State;
    var Date = req.body.Date;
    var Time_zone = req.body.Time_zone;
    var Temperature = parseInt(req.body.Temperature);

    if (!isValidStateAbbreviation(State)) {
        console.log(`State ${State} is invalid`)
        res.statusCode = 400
        res.header('Content-Type', 'application/json')
        var errorJSON = {
            "message": `${State} is not a valid state`
        }
        res.send(JSON.stringify(errorJSON))
        return;
    }

    const { data, error } = await supabase
        .from('Weather_data')
        .insert({ 'city': City, 'state': State, 'date': Date, 'time_zone': Time_zone, 'temperature': Temperature })
        .select()

    if (error) {
        console.log('error')
        res.send(error)
    } else {
        res.send(data)
    }
}) */ 