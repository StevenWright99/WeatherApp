import { div, section } from "framer-motion/client";
import { useState, useEffect } from 'react';

export default function HourlyForecast(props) {

    const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY;

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (!props.city || !props.country) return;

        const fetchData = async () => {
            const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${props.city}&country=${props.country}&units=I&key=${API_KEY}`;
            const result = await fetch(url);
            const data = await result.json();
            console.log('Hourly:', data);
            setWeatherData(data);
        };

        fetchData();
    }, [props.city, props.country]); // ✅ runs every time city or country changes

    // So we will not be displaying any information from this component
    // Instead, we will export the data we need as a javascript object and prop it into Scroller.jsx
    // One problem, the mapping of each chunk of data happens below...
    // Each chunk will contain...
        // (Time, Imgage, Temp). We want 24 of these
    // How?
    // A Map?
    // Assumed variables
    // const exportTime = convertedTimeArray[index]
    // const exportIcon = testArray[index]
    // const exportTemp = weatherData?.data[index]?.temp

    // console.log("Converted Time Array",convertedTimeArray[1])

    function createJavascriptObject(index) {
        return{
            time: convertedTimeArray[index],
            icon: testArray[index],
            temp: weatherData?.data[index]?.temp
        }
    }

    const exportedHourlyData = [];
    for (let i=0; i<24; i++){
        exportedHourlyData.push(createJavascriptObject(i))
    }

    console.log("Exported Hourly Data", exportedHourlyData)


    return (
        // Container for entire hourly forecast 
        <section id='hourly-section'>
            {/* Container for each hour */}
            {hourArray.map((_, index) => (
                <div key={index} id='hourly-boxes'>
                    <div className="hourly-elements" id='h-time'>{convertedTimeArray[index]}</div>
                    <div className="hourly-elements" id='h-icon'>
                        <img src={`/src/assets/WeatherIcons/${testArray[index]}`} alt="image" />
                    </div>
                    <div className="hourly-elements" id='h-temp'>Temp: {weatherData?.data[index]?.temp}</div>
                </div>
            ))}
        </section>
    )
}
