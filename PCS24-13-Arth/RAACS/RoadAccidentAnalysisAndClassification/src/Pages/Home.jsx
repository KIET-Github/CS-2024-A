import React, { useState, useEffect } from "react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Start_Lat: "",
    Start_Long: "",
    End_Lat: "",
    End_Long: "",
    Number_of_Vehicles: "",
    Day_of_Week: "",
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const startLat = searchParams.get("startLat");
    const startLong = searchParams.get("startLng");
    const endLat = searchParams.get("endLat");
    const endLong = searchParams.get("endLng");

    if (startLat && startLong && endLat && endLong) {
      setFormData((prevData) => ({
        ...prevData,
        Start_Location: `${startLat}, ${startLong}`,
        End_Location: `${endLat}, ${endLong}`,
      }));
    }
  }, [location.search]);

  useEffect(() => {
    const getCurrentDayOfWeek = () => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const currentDate = new Date();
      return days[currentDate.getDay()];
    };

    setFormData((prevData) => ({
      ...prevData,
      Day_of_Week: getCurrentDayOfWeek(),
    }));
  }, []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const searchParams = new URLSearchParams(location.search);
      const startLat = searchParams.get("startLat");
      const startLong = searchParams.get("startLng");
      const endLat = searchParams.get("endLat");
      const endLong = searchParams.get("endLng");

      const { Day_of_Week, Number_of_Vehicles } = formData;

      if (!startLat || !startLong || !endLat || !endLong) {
        console.error("Invalid coordinates");
        return;
      }
      const requestData = {
        startLat: parseFloat(startLat),
        startLong: parseFloat(startLong),
        endLat: parseFloat(endLat),
        endLong: parseFloat(endLong),
        Day_of_Week: mapDayToNumber(Day_of_Week),
        Number_of_Vehicles: parseInt(Number_of_Vehicles),
      };

      const response = await axios.post("/predict", requestData);
      const { severity_index, average_latitude, average_longitude } =
        response.data;

      // Construct a query string with the new response data
      const queryString = `severity_index=${severity_index}&average_latitude=${average_latitude}&average_longitude=${average_longitude}`;

      // Navigate to the analysis page with the new query string
      navigate(`/analysis?${queryString}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const mapDayToNumber = (day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.indexOf(day) + 1;
  };

  return (
    <div className="relative z-2">
      <h2 className="text-center text-4xl font-bold mt-8 text-white">
        Analyze Your Region
      </h2>
      <form
        className="max-w-lg mx-auto bg-white p-8 rounded shadow-md my-3"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <Input
            id="startLocation"
            name="Start_Location"
            value={formData.Start_Location}
            onChange={handleTextChange}
            label="Start Location (Latitude, Longitude)"
            className="w-full"
          />
          <Input
            id="endLocation"
            name="End_Location"
            value={formData.End_Location}
            onChange={handleTextChange}
            label="End Location (Latitude, Longitude)"
            className="w-full"
          />
          <Input
            id="numberOfVehicles"
            name="Number_of_Vehicles"
            value={formData.Number_of_Vehicles}
            onChange={handleTextChange}
            label="Number of Vehicles"
            className="w-full"
          />
          <Select
            variant="outlined"
            id="dayOfWeek"
            name="Day_of_Week"
            value={formData.Day_of_Week}
            onChange={handleTextChange}
            label="Day of Week"
            className="w-full"
          >
            <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value="Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
          </Select>

          <Button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full h-12 text-md"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
