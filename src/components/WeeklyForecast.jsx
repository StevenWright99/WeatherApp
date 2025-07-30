export default function Weather(props) {

    //Creates an array with 7 empty slots
    //Fill slots with null so we can use map on it
    // days = [null, null, null, null, null, null, null]
    const days = Array(7).fill(null);


    const dayArray = [];
    const getNext7Days = () => {


        for (let i = 0; i < 7; i++) {
            const date = new Date()
            // console.log('Date', date)
            date.setDate(date.getDate() + i)
            // console.log('Date2', date)
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            // console.log('Day', day)
            dayArray.push(day)
        }

        return dayArray;
    };

    getNext7Days();

    // This will be an object that acts like a python dictionary. 
    // We will tie animated icons to specified codes such that when a code is extracted from the json, 
    // the associated an animated image will be pull from the object to match

    // list of all possible codes
    const iconDictionary = {
        "200s": "thunderstorms",
        "300-500s": "rain",
        "600s": "snow",
        "700s": "mist/fog/haze/smoke",
        800: "sunny",
        "801-802": "partly cloudy",
        "803-900": "cloudy"
    }
    // console.log(iconDictionary[201])
    // All downloaded animated icons

    // if {props.weatherData?.[index]?.weather?.code}...
    // bw 200-299 - THEN {image}


    function codeToImage(code) {
        if (code >= 803 && code <= 900){
            // console.log("Overcast")
            return "partly-cloudy.svg"
        } 
        else if (code === 802) {
            // console.log("Partly cloudy")
            return "partly-cloudy.svg"
        }
        else if (code === 800 || code === 801) {
            // console.log("Sunhsine")
            return "sunny.svg"
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

    // let linkToImage = codeToImage(800);
    // console.log(linkToImage)

    // [ 201, 802, 802, 802, 802, 801, 801 ]

    // props.weatherData?.[index]?.weather?.code

    // Create a function that calls codeToImage 7 times, and stores results in an array
    function imageStorage() {
        const iconArray = []
        for (let i = 0; i < 7; i++) {
            let currentCode = props.weatherData?.[i]?.weather?.code
            let codeToIcon = codeToImage(currentCode)
            // console.log(currentCode)
            iconArray.push(codeToIcon)
        }
        return iconArray
    }

    let testArray = imageStorage()
    // console.log(testArray)

    testArray[0]


    return (
        <section className="mainContent" id='weather-container' >
            {/* header that extends length of forecast - contains city name*/}
            <div className='mainContent' id='header'>Weekly Forecast</div>
            {/* <div className='mainContent' id='header'>{props.city}, {props.state}</div> */}
            {/* Block 1/7 - Contains... */}


            <section className="mainContent" id='days-box-collection'>
                {days.map((_, index) => (
                    // .map runs this function once for every item in array
                    // Index is 0,1,2,3,4,5,6
                    // _ means "I don't care about the value, I only care about the index"
                    <div key={index} className="mainContent" id='weather-info-container'>
                        <div
                            id="day"
                            style={dayArray[index] === "Sun" || dayArray[index] === "Sat" ? { margin: "0px", color: "rgb(29, 50, 174)", background: "white" } : {}}
                        >
                            {dayArray[index]}
                        </div>
                        <div id='image'>
                            <img id='weather-icon' src={`/src/assets/WeatherIcons/${testArray[index]}`} alt='Picture' />
                        </div>
                        <div id='condition'>{props.weatherData?.[index]?.weather?.description}</div>
                        <div id='high'>{props.weatherData?.[index]?.max_temp}°F</div>
                        <div id='low'>{props.weatherData?.[index]?.min_temp}°F</div>
                    </div>
                ))}
                {/* Day - abbreviated to three letters */}
            </section>

            {/* <section className="mainContent" id='day-names'>
                {days.map((_, index) => (
                    <div key={index} className="mainContent" id='what-day'>DAY</div>
                ))}
            </section>
            <section className="mainContent" id='weather-icons'>
                <img id='weather-icon' src={props.image[0].day.condition.icon} alt="weather icon" />
            </section>
            <section className="mainContent" id='condition'>
                <div id='weather-condition'>{props.condition}</div>
            </section>
            <section className="mainContent" id='highs'>
                <div id='high'>{props.forecast[0].day.maxtemp_f}°</div>
            </section>
            <section className="mainContent" id='lows'>
                <div id='low'>{props.forecast[0].day.mintemp_f}°</div>
            </section> */}


            {/* Image */}
            {/* Weather Type */}

            {/* High / Low */}

            {/*     or */}

            {/*     High
                        Low      */}  {/* maube different sizes */}
            {/* <div className='background-layer'></div> */}
        </section>
    )
}