 /* document.addEventListener('DOMContentLoaded', function () {
    // Mock data for the chart
    const mockData = {
    data: {
        labels: ['Temperature', 'visibility', 'description', 'Humidity', 'Wind Speed', 'Wind Gust', 'sunrise', 'sunset'],
            datasets: [{
            label: 'Weather Data',
            data: [temperature, visibility, description, humidity, windSpeed, windGust, sunrise, sunset],
             backgroundColor: ['blue', 'green', 'orange', 'red', 'yellow', 'black', 'purple', 'pink']
                    }]
        }
    };

    // Get the canvas element
    const canvas = document.getElementById('weatherChart');

    // Create the chart
    const ctx = canvas.getContext('2d');
    const weatherChart = new Chart(ctx, {
        type: 'bar',
        data: mockData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});  */



/* async function fetchDataFromDatabase() {
    // Make request to your backend endpoint that fetches data from the database
    const response = await fetch('/supabase_data');
    const data = await response.json();
    return data;
}*/

async function fetchDataFromExternalProvider() {
    // Make request to your backend endpoint that fetches data from the external provider
    const response = await fetch('/external_data');
    const data = await response.json();
    return data;
}

 async function createChart() {
    // Fetch data from both sources
    // const databaseData = await fetchDataFromDatabase();
    const weatherData = await fetchDataFromExternalProvider();

    // Process data as needed
    const temperature = weatherData.data.temperature;
    const visibility = weatherData.data.visibility;
    const description = weatherData.data.weather[0].description;
    const humidity = weatherData.data.humidity;
    const windSpeed = weatherData.data.wind.speed;
    const windGust = weatherData.data.wind.gust;
    const sunrise = weatherData.data.sys.sunrise;
    const sunset = weatherData.data.sys.sunset;

    // Create chart using Chart.js
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature', 'visibility', 'description', 'Humidity', 'Wind Speed', 'Wind Gust', 'sunrise', 'sunset'],
            datasets: [{
                label: 'Weather Data',
                data: [temperature, visibility, description, humidity, windSpeed, windGust, sunrise, sunset],
                backgroundColor: ['blue', 'green', 'orange', 'red', 'yellow', 'black', 'purple', 'pink']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create chart initially
createChart(); 

/* // Update chart every 5 minutes
setInterval(createChart, 5 * 60 * 1000);  */