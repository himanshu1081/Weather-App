
import { useState } from 'react';
import './App.css'
import Partly_cloudy from './assets/Partly cloudy.png';
import Sunny from './assets/Sunny.png';
import Haze from './assets/Haze.png';
import '@fortawesome/fontawesome-free/css/all.min.css';






function App() {
  const [image,setImage]=useState(Partly_cloudy);
  const[city,setCity]=useState("Agra");
  const[condition,setCondition]=useState("Sunny");
  const[description,setDescription]=useState("Today is Sunny Day.");
  const[temperature,setTemperature]=useState(26);
  const[feelsLike,setFeelsLike]=useState(29.68);
  const[humidity,setHumidity]=useState(16);

  function handleCity(event){
    setCity(event.target.value);
  }

  function handleImage(text){
    if(text==='Sunny'){
      setImage(Sunny);
    }else if(text==='Clouds'){
      setImage(Partly_cloudy);
    }else if(text==='Haze'){
      setImage(Haze);
    }
  }


  async function getWeather(city){
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=76b114c22b4ff11dd3e95377b809082a&units=metric`);
    const data = await response.json();
    const mainData=data.main;
    const weather = data.weather[0];
    setTemperature(mainData.temp);
    setCondition(weather.main);
    setHumidity(mainData.humidity);
    setFeelsLike(mainData.feels_like);
    handleImage(weather.main);

    console.log(data);
  }
  return (
    <div className="main">
      <div className='centre'>
        <p className='title'>Weather App</p>
        <div className="main-box">
          <div className="search">
          <input type="text" className='city' value={city} onChange={handleCity} onKeyDown={(e)=>{if(e.key==='Enter'){ getWeather(city);}}}></input>
          <div className="search-icon-container">
          <button className="fas fa-search" onClick={()=>getWeather(city)}/>
          </div>
          </div>
          <div className='temp-img-container'>
          <img src={image} className="temp-img" alt='temperature-image'/>
          </div>
          <p className='value-temperature'>{temperature.toFixed(1)}°C</p>
          <p className='value-weather'>{condition}</p>
          <div className='other-info-container'>
            <p className='other-info feels-like'>Feels Like<br/>{feelsLike.toFixed(1)}°C</p>
            <p className='other-info humidity'>Humidity<br/>{humidity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
