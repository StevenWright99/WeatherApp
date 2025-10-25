import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from '/src/components/Sidebar.jsx'
import WeeklyForecast from './components/WeeklyForecast'
import Overlay from './components/Overlay'
import LocationSearch from './components/LocationSearch'
import HourlyForecast from './components/HourlyForecast'
import CurrentWeather from './components/CurrentWeather'
import Scroller from './components/Scroller'
import HourlyForecastNoRender from './components/HourlyForecastNoRender'


// const OLDapi_key = '28855b5ab9e04adfb4d20639250506'
// const OLDcity = 'Katy'
// const OLDURL = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=7&aqi=no&alerts=no"`

// const api_key = '93ca16a4c7014f4f86279558d8ae95a7'
// const URL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Katy%2C%20Tx&units=I&key=93ca16a4c7014f4f86279558d8ae95a7'

const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const [hourlyData, setHourlyData] = useState([]);

  // Called when user selects a city in the LocationSearch dropdown
  const handleCitySelect = async (city) => {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lon}&units=I&key=${API_KEY}`
      );
      const data = await response.json();

      console.log('Weather data:', data);
      setWeatherData({
        city_name: city.name,
        state_code: city.region,
        country: city.country,
        country_code: city.countryCode,
        data: data.data,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Default City when app starts
  useEffect(() => {
    const defaultCity = {
      name: 'New York City',
      region: 'NY',
      country: 'United States',
      countryCode: 'US',
      lat: 40.7128,
      lon: -74.0060,
    };
    handleCitySelect(defaultCity);
  }, []);

  return (
    <>
      <Sidebar
        city={weatherData?.city_name}  //Using ? because will break if API data doesn't load before the page renders 
        state={weatherData?.state_code}
        country={weatherData?.country_code}>
        {/* Search input (autocomplete) */}
        <LocationSearch onCitySelect={handleCitySelect} />
      </Sidebar>

      {/* <Overlay /> */}
      <WeeklyForecast
        // temp = {weatherData?.current.temp_f}
        city={weatherData?.city_name}
        state={weatherData?.state_code}
        weatherData={weatherData?.data}
      // high = {weatherData?.data[0].max_temp}
      // low = {weatherData?.data[0].min_temp}
      // forecast = {weatherData?.forecast.forecastday}
      // image = {weatherData?.forecast.forecastday}
      // condition = {weatherData?.data[0].weather.description}
      />
      <HourlyForecastNoRender
        city={weatherData?.city_name}
        country={weatherData?.country_code}
        onDataReady={setHourlyData}
      />
      {hourlyData.length > 0 && <Scroller items={hourlyData}/>}
      <CurrentWeather
        city={weatherData?.city_name}
        country={weatherData?.country_code}
      />
      

    </>
  )
}

export default App

