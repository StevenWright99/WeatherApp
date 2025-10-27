import { useState, useEffect } from 'react'
import clearDay from '../assets/WeatherIcons/clear-day.svg'
import clearNight from '../assets/WeatherIcons/clear-night.svg'
import cloudy from '../assets/WeatherIcons/cloudy.svg'
import overcastDay from '../assets/WeatherIcons/overcast-day.svg'
import overcastNight from '../assets/WeatherIcons/overcast-night.svg'
import partlyCloudyDay from '../assets/WeatherIcons/partly-cloudy-day.svg'
import partlyCloudyNight from '../assets/WeatherIcons/partly-cloudy-night.svg'
import partlyCloudy from '../assets/WeatherIcons/partly-cloudy.svg'
import rainy from '../assets/WeatherIcons/rainy.svg'
import snowy from '../assets/WeatherIcons/snowy.svg'
import sunny from '../assets/WeatherIcons/sunny.svg'
import thunder from '../assets/WeatherIcons/thunder.svg'

export default function CurrentWeather(props) {

    const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY;

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (!props.city || !props.country) return;

        const fetchData = async () => {
            const url = `https://api.weatherbit.io/v2.0/current?city=${props.city}&country=${props.country}&units=I&key=${API_KEY}`;
            const result = await fetch(url);
            const data = await result.json();
            console.log('Current Temp:', data);
            setWeatherData(data);
        };

        fetchData();
    }, [props.city, props.country]); //  runs every time city or country changes


    // Stolen code from Weather.jsx. <-- Need to abstract. It's ugly and repeats in three separate files
    function codeToImage(code) {
        if (code >= 803 && code <= 900) {
            // console.log("Overcast")
            return partlyCloudy
        }
        else if (code === 802) {
            // console.log("Partly cloudy")
            return partlyCloudy
        }
        else if (code === 800 || code === 801) {
            // console.log("Sunhsine")
            return sunny
        }
        else if (code >= 700 && code < 800) {
            // console.log("Unknown Precipitaion LOL")
            return cloudy
        }
        else if (code >= 600 && code < 700) {
            // console.log("SNOWWWW")
            return snowy
        }
        else if (code >= 300 && code < 600) {
            // console.log("It's raining...")
            return rainy
        }
        else if (code >= 200 && code < 300) {
            // console.log("It's a thunderin' BOOOM!")
            return thunder
        }
        else return "Unknown Code: " + code
    }
    const icon = codeToImage(weatherData?.data[0]?.weather.code)

    return (
        <section id='weather-current-container'>
            <div id='current-city'>{weatherData?.data[0]?.city_name}</div>
            <section id='current-image-container'>
                <img id='current-image' src={icon} alt="icon image" />
            </section>
            <section id='current-temp-container'>
                <div id='current-temp'>{weatherData?.data[0]?.temp}°F</div>
                <div id='current-feelsLike'>Feels like {weatherData?.data[0]?.app_temp}°F</div>
            </section>
            <div id='current-condition'>{weatherData?.data[0]?.weather.description}</div>

        </section>
    )
}