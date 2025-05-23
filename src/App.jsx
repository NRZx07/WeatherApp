import axios from 'axios'
import React, { useState } from 'react'

const App = () => {
const[city, setCity] = useState('');
const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
 const API_URL = import.meta.env.VITE_REACT_APP_API_URL;



  const getWeather = async () => {
    if(!city) return;
    setLoading(true);
    try{
     const res = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);

      setWeather(res.data);
      setError('');
    }
catch(err){
    setWeather(null);
      setError(err.response?.data?.message || 'Error fetching weather');
}
     finally {
      setLoading(false);
    }
  };
  
  return ( 
    <div className="relative w-full h-screen overflow-hidden">
      <video src="./bg.mp4"  autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
    <div className="container bg-purple-500 rounded p-4 shadow-md text-indigo-800 w-64 mx-auto mt-10">

      <h1 className="text-center font-bold text-3xl mb-2 "> Weather App </h1>
     
      <div className="flex flex-col justify-center items-center">
        <input type="text" value={city}  onChange={(e) => setCity(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && getWeather()} placeholder="Enter city name" className="border-2 border-gray-300 rounded-lg p-2 mt-4" />
        <button onClick={getWeather} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Get Weather</button>
        
      {weather && (
  <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
    <h2 className="text-xl">{weather.name} Weather Details</h2>
    <p>Temperature: {weather.main.temp}°C</p>
    <p>Condition: {weather.weather[0].main}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind Speed: {weather.wind.speed} km/h</p>
  </div>
)}

      
          </div>
          </div>
          </div>
          </div>
  
  )

}

export default App