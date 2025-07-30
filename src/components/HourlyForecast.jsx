import { div, section } from "framer-motion/client";
import { useState, useEffect } from 'react';

export default function HourlyForecast(props) {

    // Fetching hourly data

    const URL = 'https://api.weatherbit.io/v2.0/forecast/hourly?city=Katy&country=US&hours=5&key=93ca16a4c7014f4f86279558d8ae95a7'
    const URLnoImperial = 'https://api.weatherbit.io/v2.0/forecast/hourly?city=Katy&country=US&hours=5&key=93ca16a4c7014f4f86279558d8ae95a7'

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


    // console.log("Hello", weatherData?.data[0])


    // Stolen Code from Weather.jsx
    function codeToImage(code) {
        if (code >= 804 && code <= 900) {
            return "overcast-day.svg"
        }
        else if (code === 803) {
            // console.log("Overcast")
            return "partly-cloudy-day.svg"
        }
        else if (code === 800 || code === 801 || code === 802) {
            // console.log("Partly cloudy")
            return "clear-day.svg"
        }
        else if (code >= 700 && code < 800) {
            // console.log("Unknown Precipitaion LOL")
            return "cloudy.svg"
        }
        else if (code >= 600 && code < 700) {
            // console.log("SNOWWWW")
            return "snowy.svg"
        }
        else if (code >= 300 && code < 600) {
            // console.log("It's raining...")
            return "rainy.svg"
        }
        else if (code >= 200 && code < 300) {
            // console.log("It's a thunderin' BOOOM!")
            return "thunder.svg"
        }
        else return "Unknown Code: " + code
    }

    // I want a function that toggles sunset to be true after 8:00PM and toggle sunset to be false after 6:00AM
    // function toggleSunset(time){
    //     // Establish sunset toggle time (8:00PM)
    //     const sunsetTimeFull = "2025-07-19T01:00:00"
    //     // Slice off front half, we don't care about the date, just the time
    //     const sunsetTime = testTime.slice(11) //This is the comparison time
    //     // We will then take in current time from json and compare if it's before of after this time
    //     console.log("Slice", toggleSunsetTime)
    //     // weatherData?.data[i]?.timestamp_local
    // }
    // toggleSunset(weatherData?.data[0]?.timestamp_local);




    // This function 
    // 1. Create and empty array, 
    // 2. Fills that array 24 times,
    // 3 Returns a string that corresponds to a time and a cloud condition
    // Error: This whole function is called 24 times
    // The only thing the function should do is return a string
    // so we need A different function for..

    // Creating an empty array?
    // Filling that array once?

    // Then in our function we...
    // check if currentTime is before or after sunset
    // check cloud number
    // Return a string

    // Store 24 timestamps in an array
    // return timestampArray;
    function getTimestampArray() {
        const timestampArray = []
        for (let i = 0; i < 24; i++) {
            let time = weatherData?.data[i]?.timestamp_local;
            // console.log(time)
            timestampArray.push(time);
        }
        return timestampArray;
    }

    const timestampArray = getTimestampArray();

    function cloudPercentToImage(clouds, i) {

        const sunset = "2025-07-29T20:00:00" //today @ 8PM
        const sunrise = "2025-07-30T06:00:00" //tmrw @ 6AM

        let currentTime = timestampArray[i]
        // console.log("Time being compared", currentTime)
        if (currentTime <= sunset) { //time before sunset 
            if (clouds < 40) {
                // console.log("clear-day")
                return "clear-day.svg"
            }
            else if (clouds < 60 && sunset === false) {
                // console.log("partly-cloudy-day")
                return "partly-cloudy-day.svg"
            }
            else {
                // console.log("overcast-day")
                return "overcast-day.svg"
            }
        }
        else if (currentTime > sunset && currentTime < sunrise) { //time after sunset
            if (clouds < 40) {
                // console.log("clear-night")
                return "clear-night.svg"
            }
            else if (clouds < 60) {
                // console.log("partly-cloudy-night")
                return "partly-cloudy-night.svg"
            }
            else {
                // console.log("overcast-night")
                return "overcast-night.svg"
            }
        }

        else if (currentTime >= sunrise) { //time after sunrise
            if (clouds < 40) {
                // console.log("clear-day")
                return "clear-day.svg"
            }
            else if (clouds < 60) {
                // console.log("partly-cloudy-day")
                return "partly-cloudy-day.svg"
            }
            else {
                // console.log("overcast-day")
                return "overcast-day.svg"
            }
        }

    }
    // const testFunction = cloudPercentToImageOld();
    // console.log("Time array", testFunction)

    function cloudPercentToImageOld(clouds) {
        if (clouds < 40) {
            return "clear-day.svg"
        }
        else if (clouds < 60) {
            return "partly-cloudy-day.svg"
        }
        else return "overcast-day.svg"
    }

    function imageStorage() {
        const iconArray = []
        for (let i = 0; i < 24; i++) {
            let clouds = weatherData?.data[i]?.clouds
            let codeToIcon = cloudPercentToImage(clouds, i)
            // console.log(currentCode)
            iconArray.push(codeToIcon)
        }
        return iconArray
    }

    let testArray = imageStorage()

    // Creat tempIndex with length of 5 (Update to 23 or whatever later)
    const hourArray = Array(24).fill(null)

    // Converts local timestamp to reasonable format and store in array
    const convertedTimeArray = []
    for (let i = 0; i < hourArray.length; i++) {
        const timeToBeConverted = weatherData?.data[i]?.timestamp_local
        const time = formatTo12HourTime(timeToBeConverted);
        convertedTimeArray.push(time)
    }

    // Converts time to 12 hour time and better format
    function formatTo12HourTime(string) {
        const date = new Date(string)
        return date.toLocaleDateString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }


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
                    {/* <div className="hourly-elements" id='h-precip'>Prec: {weatherData?.data[index]?.precip}</div> */}
                    {/* <div className="hourly-elements" id='h-code'>Code: {weatherData?.data[index]?.weather?.code}</div> */}
                </div>
            ))}
        </section>
    )
}


//  return (
//         // Container for entire hourly forecast 
//         <section id='hourly-section'>
//             {/* Container for each hour */}
//             {hourArray.map((_, index) => (
//                 <div key={index} id='hourly-boxes'>
//                     <div className="hourly-elements" id='h-time'>{convertedTimeArray[index]}</div>
//                     <div className="hourly-elements" id='h-icon'>
//                         <img src={`/src/assets/WeatherIcons/${testArray[index]}`} alt="image" />
//                     </div>
//                     <div className="hourly-elements" id='h-temp'>Temp: {weatherData?.data[index]?.temp}</div>
//                     {/* <div className="hourly-elements" id='h-precip'>Prec: {weatherData?.data[index]?.precip}</div> */}
//                     {/* <div className="hourly-elements" id='h-code'>Code: {weatherData?.data[index]?.weather?.code}</div> */}
//                 </div>
//             ))}
//         </section>
//     )