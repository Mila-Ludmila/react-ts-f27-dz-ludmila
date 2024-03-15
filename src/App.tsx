import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import ChildComponent from "./components/ChildComponent/ChildComponent";

interface ICityData {
  name: string;
  country: string;
  founded: number;
  population: number;
  photos: string[];
}
interface IWeather {
  name: string;
  sys: { country: string };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    feels_like: number;
    temp: number;
    humidity: number;
  };
}

const info = {
  founded: 1789,
  population: 1010537,
  photos: [
    "/photos/Odesa-Montage-2016.png",
    "/photos/Воронцовський_маяк_12.jpg",
    "/photos/Потьомкінські_сходи_11.jpg",
    "/photos/Пам'ятник_Арману_де_Рішельє.jpg",
    "/photos/Operniy-2.jpg",
  ],
};

function App(): JSX.Element {
  const [city, setCity] = useState<ICityData | null>(null);
  const [weatherData, setWeatherData] = useState<IWeather | null>(null);
  const [index, setIndex] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCity();
  }, []);

  const fetchCity = async () => {
    try {
      const responce = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Odesa&appid=59bbf8b127928897d5ae515391891b44&units=metric&lang=ua"
      );
      const data = await responce.json();
      if (data) {
        setCity(data);
        setWeatherData(data);
      } else {
        console.log("Error: Invalid weather data format");
      }
      console.log(data);
    } catch (error) {
      console.log("Error fetching city data:", error);
    }
  };
  if (!city || !weatherData) {
    return (
      <div className="weatherLoading">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }
  const temperatureSign =
    weatherData.main.temp > 0 ? "+" : weatherData.main.temp === 0 ? "" : "-";
  const temp = Math.abs(Math.round(weatherData.main.temp));
  const feelLike = Math.abs(Math.round(weatherData.main.feels_like));
  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const description = weatherData.weather[0].description;
  const weatherStatus = weatherData.weather[0].main;
  const weatherIcon = weatherData.weather[0].icon;

  const nextChange = () => {
    setIndex((prevIndex) => (prevIndex + 1) % info.photos.length);
  };

  //   const menuToggle = document.querySelector('.menu-toggle');
  // if (menuToggle) {
  //   menuToggle.addEventListener('click', function(this: HTMLElement) {
  //     this.classList.toggle('change'); // Додаємо/видаляємо клас 'change' до/з '.menu-toggle'
  //   });
  // }

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className={`App ${isMenuOpen ? 'menu-open' : ''}`}>
    <div className="App">
<header>

<div className='App-header'>
    <label htmlFor="menu-toggle" className="hamburger-menu">
      <input
        id="menu-toggle"
        type="checkbox"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <span></span>
      <span></span>
      <span></span>
    </label>
    <div className={`menu ${isOpen ? "is-open" : ""}`}>
      <h2>Погода у місті: {cityName}</h2>
      <p>Погодні умови: {description}</p>
      <p>{weatherStatus}</p>
      <p className="weatherTemp">
        Температура: {temperatureSign}
        {temp}
      </p>
      <p className="weatherFeelsLike">
        Відчувається як: {temperatureSign}
        {feelLike}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
        alt="Weather Icon"
      />
    </div>
  </div>


        {/* <div className='App-header' >
        <div className={`hamburger-menu ${isOpen ? "menu" : ""}`}>
        <input
            id="menu-toggle"
            type="checkbox"
            checked={isOpen}
            onChange={toggleMenu}
          />
          <label htmlFor="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </label>
          
          <h2>Погода у місті: {cityName}</h2>
          <p>Погодні умови: {description}</p>
          <p>{weatherStatus}</p>
          <p className="weatherTemp">
            Температура: {temperatureSign}
            {temp}
          </p>
          <p className="weatherFeelsLike">
            Відчувається як: {temperatureSign}
            {feelLike}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
            alt="Weather Icon"
          />
          </div>
          
        </div> */}

        {/* <div className={`hamburger-menu ${isOpen ? "is-open" : ""}`}>
          <input
            id="menu-toggle"
            type="checkbox"
            checked={isOpen}
            onChange={toggleMenu}
          />
          <label htmlFor="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <div className="menu">
            <h2>Погода у місті: {cityName}</h2>
            <p>Погодні умови: {description}</p>
            <p>{weatherStatus}</p>
            <p className="weatherTemp">
              Температура: {temperatureSign}
              {temp}
            </p>
            <p className="weatherFeelsLike">
              Відчувається як: {temperatureSign}
              {feelLike}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
              alt="Weather Icon"
            />
          </div>
        </div> */}
      </header>


      {/* <header>
        <div className="App-header">
          <h2>Погода у місті: {cityName}</h2>
          <p>Погодні умови: {description}</p>
          <p>{weatherStatus}</p>
          <p className="weatherTemp">
            Температура: {temperatureSign}
            {temp}
          </p>
          <p className="weatherFeelsLike">
            Відчувається як: {temperatureSign}
            {feelLike}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
            alt="Weather Icon"
          />
        </div>

        <div className={`hamburger-menu ${isOpen ? "is-open" : ""}`}>
          <input
            id="menu-toggle"
            type="checkbox"
            checked={isOpen}
            onChange={toggleMenu}
          />
          <label htmlFor="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <div className="menu">
            <h2>Погода у місті: {cityName}</h2>
            <p>Погодні умови: {description}</p>
            <p>{weatherStatus}</p>
            <p className="weatherTemp">
              Температура: {temperatureSign}
              {temp}
            </p>
            <p className="weatherFeelsLike">
              Відчувається як: {temperatureSign}
              {feelLike}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
              alt="Weather Icon"
            />
          </div>
        </div>
      </header> */}

      <div className="App-content">
        <div className="wrap-btn">
          <button className="btn btn-success" onClick={nextChange}>
            Next
          </button>
        </div>
        <h2>
          {cityName}, {country}
        </h2>
        <p>Дано назву: {info.founded} року</p>
        <p>Населення: {info.population} осіб</p>
        <img src={info.photos[index]} alt="info photos" />
      </div>

      {/* <ChildComponent city={city} info={info} /> */}
    </div>
  );
}

export default App;
