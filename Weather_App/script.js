document.addEventListener('DOMContentLoaded',()=>{
    const InputText = document.getElementById('city-input')
    const GetWeatherBtn = document.getElementById('get-weather-btn')
    const WeatherInfoDiv = document.getElementById('weather-info')
    const ErrorMessage = document.getElementById('error-message')
    const CityName = document.getElementById('city-name')
    const Temperature = document.getElementById('temperature')
    const Description = document.getElementById('description')
    const feelslike = document.getElementById("feelslike")
    const API_KEY="put your OpenWeatherMap api key here , i am not putting it here to avoid misuse";

    GetWeatherBtn.addEventListener('click',async()=>{
        const InputValueText = InputText.value.trim();
        if (!InputValueText) {
            return;
        }

        try {
            const WeatherDataResponse = await getWeatherData(InputValueText);
            displayWeatherData(WeatherDataResponse);
        } catch (error) {
            displayError()
        }
    })

    async function getWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('City not found');
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        CityName.textContent=data.name;
        Temperature.textContent=`Temperature: ${data.main.temp}`
        Description.textContent=`Weather Condition: ${data.weather[0].description}`
        feelslike.textContent=`Feels Like: ${data.main.feels_like}`

        WeatherInfoDiv.classList.remove('hidden')
        ErrorMessage.classList.add('hidden')
    }

    function displayError(){
        WeatherInfoDiv.classList.add('hidden')
        ErrorMessage.classList.remove('hidden')
    }

})