 import { useEffect, useState } from 'react'
 import "./Weather.css"
import sun_icon from '../assets/sun.webp'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/windy.png'
import snow_icon from '../assets/snow.png'
import drizzly_icon from '../assets/drizzly.png'
import cloud_icon from '../assets/cloud.jpg'
import clear_icon from '../assets/sun.webp'
import rain_icon from '../assets/images.png'
import { useRef } from 'react'



 const Weather = () => {

  const inputRef = useRef()

      const allIcon = {
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzly_icon,
        "04n":drizzly_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "11d":snow_icon,
        "11n":snow_icon,
      }



    const [weatherData, setWeatherData] = useState(false)

   
      const search = async(city)=>{
        try {
          
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

          const response = await fetch(url)
          const data = await response.json()
          console.log(data);
          const icon = allIcon[data.weather[0].icon] || clear_icon
          setWeatherData({
            temprature:Math.floor(data.main.temp),
            humidity:data.main.humidity,
            location: data.name,
            speed:data.wind.speed,
            icon: icon,
          })

        } catch (error) {
          
        }
      }


    

    useEffect(()=>{
      search("Uzbekistan")
    },[])



   return (
    <div className='body'>
      
     <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src="https://toppng.com/uploads/preview/search-icon-customer-icon-11564158924ifw7wyjtfu.png" alt=""  onClick={()=> search(inputRef.current.value)}/>
        </div> 
    
       <img className='img-size' src={weatherData.icon} alt="" />
        <h1 className='box'>{weatherData.temprature} °C</h1>
        <p className='size'>{weatherData.location}</p>
        <div className='weather1'>
        <div className='weather-img'>
             <img src={humidity_icon} alt="" />
             <div className='col'>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
            </div>
            </div>  

            <div className='weather-img'>
            <img src={wind_icon} alt="" />
            <div className='col'>
            <p>{weatherData.speed} km/h</p>
            <span>Wind speed</span>
            </div>
            </div>
        </div>

     </div>  
     </div>
   )
 }
 
 export default Weather