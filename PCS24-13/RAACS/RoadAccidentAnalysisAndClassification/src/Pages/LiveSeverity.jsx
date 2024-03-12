import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { Box, Heading, Button } from "theme-ui";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const LiveSeverity = () => {
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [startIsClicked, setstartIsClicked] = useState(false);
  const [directions, setDirections] = useState(null);
  const [simulationTimeout, setSimulationTimeout] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
  });

  // const socket = io("http://localhost:5000");

  useEffect(() => {
    if (startIsClicked) setShowNotification(true);
  }, [startIsClicked]);

  const handleDirectionsResponse = (result) => {
    if (result.status === "OK") {
      setDirections(result);
    } else {
      console.error(`Error with directions: ${result.status}`);
    }
  };
  // Function to get the user's location
  const getUserLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          successCallback(userLocation);
          const requestData = {
            startLat: parseFloat(position.coords.latitude),
            startLong: parseFloat(position.coords.longitude),
            Day_of_Week: 2,
            Number_of_Vehicles: 2,
          };
          // socket.emit("location_update", requestData);
        },
        (error) => {
          errorCallback(error);
        },
        { enableHighAccuracy: true, distanceFilter: 100 }
      );
    } else {
      errorCallback("Geolocation is not supported by your browser.");
    }
  };
  // Function to calculate the distance between two sets of coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const simulateMovement = async () => {
    const sendRequest = async () => {
      const response = await axios.post("/predict", {
        startLat: startMarker.lat,
        startLong: startMarker.lng,
        Day_of_Week: 2,
        Number_of_Vehicles: Math.floor(Math.random() * 3) + 1,
      });
      const { severity_index } = response.data;
      setSeverity(severity_index);

      // Add logic to check if simulation should continue or end
      const distance = calculateDistance(
        startMarker.lat,
        startMarker.lng,
        endMarker.lat,
        endMarker.lng
      );
      console.log("Distance:", distance);
      setStartMarker();
      if (distance >= 0.01) {
        setTimeout(simulateMovement, 3000); // Send the next request after 3 seconds
      } else {
        setSimulating(false);
      }
    };

    // Initial request
    sendRequest();
  };

  const handleStartClick = () => {
    setstartIsClicked(true);
    if (startMarker && endMarker) {
      // Start the simulation
      setSimulating(true);
      setDirections(null); // Clear previous directions
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: startMarker,
          destination: endMarker,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error(`Error with directions: ${status}`);
          }
        }
      );
      setShowNotification(true);
      const timeoutId = simulateMovement();
      // Save the simulation timeout ID
      setSimulationTimeout(timeoutId);
    }
  };

  const handleEndClick = () => {
    // End the simulation
    setSimulating(false);
    setShowNotification(false);
    setDirections(null);
    // Ensure the simulation stops immediately
    clearTimeout(simulationTimeout); // Clear the timeout
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };

    if (!startMarker) {
      setStartMarker(newMarker);
    } else if (startMarker && !endMarker) {
      setEndMarker(newMarker);
    }
  };

  useEffect(() => {
    getUserLocation(
      (location) => {
        setUserLocation(location);
        setMapCenter(location);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loadError) return <h1>Error loading maps</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        px: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          my: "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Heading
          as="h1"
          className="text-4xl text-white"
          sx={{ fontFamily: "rubik" }}
        >
          {" "}
          Select a Location
        </Heading>
      </Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={mapCenter}
          zoom={12}
          onClick={handleMapClick}
        >
          {startMarker && (
            <Marker
              position={{ lat: startMarker.lat, lng: startMarker.lng }}
              onClick={() => setStartMarker(null)}
            />
          )}
          {endMarker && (
            <Marker
              position={{ lat: endMarker.lat, lng: endMarker.lng }}
              onClick={() => setEndMarker(null)}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </Box>
      {showNotification && (
        <Box
          sx={{
            // Center the notification banner over the map
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center horizontally and vertically
            zIndex: 3,
            background: "white",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>
            Severity Index: <strong>{severity}</strong>
          </p>
          {simulating && (
            <Button
              onClick={handleEndClick}
              className={`bg-red-500 hover-bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover-border-red-500 rounded mt-2`}
            >
              End
            </Button>
          )}
        </Box>
      )}
      <Box
        sx={{
          textAlign: "center",
          mt: "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Button
          onClick={handleStartClick}
          disabled={!startMarker || !endMarker || simulating}
          className={`bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded ${
            startMarker && endMarker && !simulating ? "" : "cursor-not-allowed"
          }`}
        >
          Start Simulation
        </Button>
      </Box>
    </Box>
  );
};

export default LiveSeverity;
