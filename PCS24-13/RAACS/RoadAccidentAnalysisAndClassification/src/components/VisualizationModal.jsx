import React, { useState, useEffect } from "react";
import severity1Image from "../assets/severity1.jpg";
import severity2Image from "../assets/severity2.png";
import severity3Image from "../assets/severity3.png";
import Papa from "papaparse"; // Import Papa from the papaparse library

const severityData = [
  {
    image: severity1Image,
    title: "Severity Index 1",
    description:
      "Severity Index 1 indicates minor accidents. These typically involve small injuries or property damage.",
  },
  {
    image: severity2Image,
    title: "Severity Index 2",
    description:
      "Severity Index 2 represents serious accidents. These may result in moderate injuries and significant property damage.",
  },
  {
    image: severity3Image,
    title: "Severity Index 3",
    description:
      "Severity Index 3 signifies fatal accidents. These are the most severe and often involve loss of life.",
  },
];

const VisualizationModal = ({
  severityIndex,
  isOpen,
  onClose,
  latitude,
  longitude,
  apiKey,
  speedLimit,
}) => {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [currentWeather, setCurrentWeather] = useState("");
  const mapWeatherIcon = (iconCode, isDay) => {
    const iconPrefix = isDay ? "d" : "n";
    return `${iconCode}${iconPrefix}.png`;
  };

  // Function to generate a CSV file
  const generateCSV = () => {
    // Prepare your data
    const data = [
      [
        "Latitude",
        "Longitude",
        "Severity Index",
        "Speed Limit",
        "Current Weather",
        "Road Type",
        "Light Conditions",
      ],
      [
        latitude,
        longitude,
        severityIndex,
        speedLimit,
        currentWeather,
        "Dry",
        "Well-Lit",
      ],
    ];

    // Create a CSV
    const csv = Papa.unparse(data);

    // Create a Blob and a download link
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "report.csv";

    // Trigger a click on the link to initiate the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isOpen) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.weather && data.weather.length > 0) {
            const conditionCode = data.weather[0].id;
            const iconBaseUrl = "https://openweathermap.org/img/wn/";
            const weatherIconCode = getWeatherIcon(
              conditionCode,
              data.weather[0].icon.includes("d")
            );
            const weatherIconUrl = `${iconBaseUrl}${weatherIconCode}`;
            setWeatherIcon(weatherIconUrl);
            setCurrentWeather(data.weather[0].description);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
        });
    } else {
      setWeatherIcon(null);
      setCurrentWeather("");
    }
  }, [isOpen, latitude, longitude, apiKey]);

  const getWeatherIcon = (conditionCode, isDay) => {
    // Map the condition code to the corresponding icon
    switch (conditionCode) {
      case 800:
        return mapWeatherIcon("01", isDay); // clear sky
      case 801:
        return mapWeatherIcon("02", isDay); // few clouds
      case 802:
        return mapWeatherIcon("03", isDay); // scattered clouds
      case 803:
        return mapWeatherIcon("04", isDay); // broken clouds
      case 500:
      case 501:
        return mapWeatherIcon("09", isDay); // shower rain
      case 502:
      case 503:
      case 504:
        return mapWeatherIcon("10", isDay); // rain
      case 511:
      case 520:
      case 521:
      case 522:
      case 531:
        return mapWeatherIcon("09", isDay); // shower rain
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return mapWeatherIcon("11", isDay); // thunderstorm
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return mapWeatherIcon("13", isDay); // snow
      case 701:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
      case 761:
      case 762:
      case 771:
      case 781:
        return mapWeatherIcon("50", isDay);
      default:
        return mapWeatherIcon("02", isDay);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal-background fixed top-0 left-0 w-full h-full bg-black opacity-40 z-40"></div>
      <div className="modal-content relative bg-white w-full md:w-4/5 lg:w-3/4 max-w-screen-xl rounded-lg shadow-lg p-4 z-50">
        <div className="main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="main-left">
            <h2 className="text-2xl font-semibold mb-4">Location Details</h2>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Speed Limit: {speedLimit}</p>
            {weatherIcon && (
              <div className="weather-details">
                <h2 className="text-2xl font-semibold mb-4 mt-2">
                  Other Details
                </h2>
                <div className="weather-icon">
                  <img
                    src={weatherIcon}
                    alt="Weather Icon"
                    className="w-20 h-20"
                  />
                </div>
                <p className="weather-description">
                  Current Weather: {currentWeather}
                </p>
                <p className="road-description">Road Type: Dry</p>
                <p className="light-description">Light Conditions: Well-Lit</p>
              </div>
            )}
            <div className="mt-4 text-center">
              <button
                className="bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded"
                onClick={generateCSV}
              >
                Download Report
              </button>
            </div>
          </div>
          {severityData.map((data, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white shadow-2xl max-w-md"
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-36 h-36 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center">
                {data.title}
              </h3>
              <p className="text-center">{data.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 text-right">
          <button
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationModal;
