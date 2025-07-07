
import { useState } from 'react';
import './App.css'
import Partly_cloudy from './assets/Partly cloudy.png';
import Sunny from './assets/Sunny.png';
import Haze from './assets/Haze.png';
import Rain from './assets/Rain.png';
import Snow from './assets/Snow.png';
import Thunderstrom from './assets/Thunderstrom.png';
import Clouds from './assets/Cloudy.png'
import '@fortawesome/fontawesome-free/css/all.min.css';






function App() {
  const apiKey = import.meta.env.VITE_API;
  const [image, setImage] = useState(Partly_cloudy);
  const [city, setCity] = useState("Agra");
  const [condition, setCondition] = useState("Sunny");
  const [temperature, setTemperature] = useState(26);
  const [feelsLike, setFeelsLike] = useState(29.68);
  const [humidity, setHumidity] = useState(16);

  function handleCity(event) {
    setCity(event.target.value);
  }


  async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const mainData = data.main;
    const weather = data.weather[0];
    setTemperature(mainData.temp);
    setCondition(weather.main);
    setHumidity(mainData.humidity);
    setFeelsLike(mainData.feels_like);

    const weatherImage = {
      Sunny: Sunny,
      Haze: Haze,
      "Partly Cloudy": Partly_cloudy,
      Thunderstrom: Thunderstrom,
      Rain: Rain,
      Snow: Snow,
      "Clear": Sunny,
      Clouds: Clouds
    }
    setImage(weatherImage[weather.main] || Sunny);

    console.log(data);
  }
  return (
    <div className="main">
      <p className='title'>Weather App</p>
      <div className="main-box">
        <div className="search">
          <input type="text" className='city-input' value={city} onChange={handleCity} onKeyDown={(e) => { if (e.key === 'Enter') { getWeather(city); } }}></input>
          <button className="fas fa-search" onClick={() => getWeather(city)} />
        </div>
        <div className='temp-img-container'>
          <img src={image} className="temp-img" alt='temperature-image' />
        </div>
        <div className='main-info-container'>
          <p className='value temperature'>{temperature.toFixed(1)}°C</p>
          <p className='value weather'>{condition}</p>
        </div>
        <div className='other-info-container'>
          <p className='other-info feels-like'>Feels Like<br />{feelsLike.toFixed(1)}°C</p>
          <p className='other-info humidity'>Humidity<br />{humidity}</p>
        </div>
      </div>
    </div>
  );
}

export default App
