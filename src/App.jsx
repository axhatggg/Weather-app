import { useState } from 'react';
import './App.css';
import { Circle } from 'rc-progress';
import CircularProgressBar from './components/CircularProgressBar';
import TypographyHeader from './components/TypographyHeader';

function App() {
  const apikey = "09b00af1552026b760b26839bf65d0b6";
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [weatherData, setWeatherData] = useState(null); // New state for storing weather data
  const [tempGradient, settempGradient] = useState("");
  const [imageSrc, setimageSrc] = useState("./images/sun.png");
  const fetchImageSrc = {
    Clear: "./images/sun.png",
    Clouds: "./images/clouds.png",
    Rain: "./images/rain.png",
    Drizzle: "./images/drizzle.png",
    Thunderstorm: "./images/thunderstorm.png",
    Snow: "./images/snow.png",
    Haze: "./images/haze.png",
    Mist: "./images/mist.png",
    Smoke: "./images/smoke.png",
    Dust: "./images/dust.png",
    Fog: "./images/fog.png",
    Sand: "./images/sand.png",
    Ash: "./images/ashes.png",
    Squall: "./images/tornado.png",
    Tornado: "./images/tornado.png",
  };
  const [datatimefetched, setdatatimefetched] = useState("");
  const [backgroundGradient, setbackgroundGradient] = useState(
    "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"
  );

  const handleClick = async () => {
    let cityname = city.trim();
    cityname = cityname.toLowerCase();
    console.log(cityname);
    if (!cityname) {
      alert('Please enter a city name');
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        if (data.message === "city not found") {
          setError(true);
          setErrorName("City not found");
        } else {
          setError(true);
          setErrorName("An error occurred: " + data.message);
        }
        setWeatherData(null); // Clear previous weather data if there's an error
      } else {
        setError(false);
        setErrorName("");
        setWeatherData(data); // Store the fetched weather data
        if (data.main.temp > 30) {
          settempGradient('linear-gradient(to right top, #ff0000, #ff3400, #fe4c00, #fe5e00, #fd6e00, #fe8000, #ff9000, #ffa000, #ffb700, #ffcf00, #fee700, #f6ff00)');
        } else if (data.main.temp > 25) {
          settempGradient('linear-gradient(to right top, #1d6c01, #2c841a, #3b9c2f, #49b644, #56d059, #4fde78, #48ec95, #44f9b2, #48fad4, #68f9ed, #91f7fb, #b9f4ff)');
        } else {
          settempGradient(' linear-gradient(to right top, #01206c, #263386, #4047a0, #595cbc, #7272d8, #6188e9, #519cf6, #46b0ff, #2ec1f8, #48ceec, #71d9df, #98e2d6');
        }
        const weatherNow = data.weather[0].main;
        setimageSrc(fetchImageSrc[weatherNow]);
        console.log(data);
        console.log(fetchImageSrc[weatherNow]);

        const timezoneOffset = data.timezone;

        // Get the current UTC time in milliseconds
        const utcTime = new Date().getTime();

        // Calculate the local time in milliseconds
        const localTime = utcTime + (timezoneOffset * 1000);

        // Create a new Date object with the local time
        const localDate = new Date(localTime);

        // Extract the time components (hours, minutes, seconds)
        const hours = localDate.getUTCHours();
        console.log(`hours : ${hours}`);
        const minutes = localDate.getUTCMinutes();
        const seconds = localDate.getUTCSeconds();
        // Format the time as a string
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        console.log(`Current time in ${city}: ${timeString}`);
        setdatatimefetched(timeString);
        if (hours > 18) {
          setbackgroundGradient("linear-gradient(to right top, #1f0042, #2d0251, #3c0360, #4c0370, #5d037f, #6f108c, #811b99, #9426a6, #ab3ab4, #c34ec3, #da61d1, #f174e0)");
        } else {
          setbackgroundGradient("linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)");
        }
        console.log(backgroundGradient);
      }
    } catch (error) {
      setError(true);
      setErrorName(error.message);
      setWeatherData(null); // Clear previous weather data if there's an error
    }
  };

  return (
    <div
      style={{
        backgroundImage: backgroundGradient
      }}
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <TypographyHeader />
      {weatherData && (<div className='text-black'> Data fetched at {datatimefetched} </div>)}
      <div className="relative bg-white/10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl md:w-1/2 w-full flex md:flex-row flex-col flex-wrap px-5 py-10 justify-center items-center md:gap-y-9 gap-y-3 gap-x-4">
        <div className='w-full md:h-40 h-28 bg-white/10 justify-center flex gap-5 items-center backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
          <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder='Enter city name' className='ring-2 ring-blue-500  bg-white w-[50%]' />
          <button role="button" onClick={handleClick} className='w-[20%] h-[28%]  button-85 text-[80%] '>Check</button>
        </div>
        {error && <p className='text-red-500 text-xl font-bold'>{errorName}</p>}
        {weatherData && (
          <>
            <div className='w-full md:h-40 h-28  bg-white/10 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden'>
              <div className='flex flex-col justify-center items-center w-full h-full' style={{ backgroundImage: tempGradient }}>
                <div className="temp md:text-6xl text-xl font-bold">
                  {weatherData.main.temp} °C
                </div>
              </div>
            </div>
            <div className='md:w-[30%] md:h-40 w-full h-28  bg-white/10 justify-center flex flex-col gap-3 items-center backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
              <div className="image md:w-20 w-14">
                <img src={imageSrc} alt="" />
              </div>
              <div className="weatherdata font-bold text-lg">{weatherData.weather[0].main}</div>
            </div>
            <div className='md:w-[30%] md:h-40 w-full h-28  bg-white/10 justify-center flex flex-col md:gap-3 gap-1 items-center backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
              <div className='font-bold md:text-lg text-sm'>
                Humidity
              </div>
              <div className='progressbar md:w-20 w-20'>
                <CircularProgressBar percentage={weatherData.main.humidity} />
              </div>
            </div>
            <div className='md:w-[30%] md:h-40 w-full h-28  bg-white/10 justify-center flex flex-col gap-3 items-center backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl'>
              <div className='font-bold md:text-[100%]  text-lg'> Wind-Speed </div>
              <div className='flex md:flex-col flex-row gap-3'>
                <div className="animation">
                  <lord-icon
                    src="https://cdn.lordicon.com/sqckosva.json"
                    trigger="loop"
                    stroke="bold"
                    state="loop-cycle"
                    colors="primary:#000000,secondary:#4030e8"
                    style={{ "width": "50px", "height": "50px" }}>
                  </lord-icon>
                </div>
                <div className="windspeeddata font-bold text-xl">
                  {weatherData.wind.speed} m/s
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
