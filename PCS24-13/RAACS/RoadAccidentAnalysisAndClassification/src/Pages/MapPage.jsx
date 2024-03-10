import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box, Heading, Button } from "theme-ui";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
  });

  const bothMarkersSelected = startMarker && endMarker;

  const handleProceedClick = () => {
    if (bothMarkersSelected) {
      const { Latitude: startLat, Longitude: startLng } = startMarker;
      const { Latitude: endLat, Longitude: endLng } = endMarker;
      navigate(
        `/home?startLat=${startLat}&startLng=${startLng}&endLat=${endLat}&endLng=${endLng}`
      );
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      Latitude: latLng.lat(),
      Longitude: latLng.lng(),
    };

    if (startMarker) {
      const latDiff = Math.abs(startMarker.Latitude - newMarker.Latitude);
      const lngDiff = Math.abs(startMarker.Longitude - newMarker.Longitude);
      if (latDiff < 0.01 && lngDiff < 0.01) {
        setStartMarker(null);
        return;
      }
    }
    if (endMarker) {
      const latDiff = Math.abs(endMarker.Latitude - newMarker.Latitude);
      const lngDiff = Math.abs(endMarker.Longitude - newMarker.Longitude);
      if (latDiff < 0.01 && lngDiff < 0.01) {
        setEndMarker(null);
        return;
      }
    }

    if (!startMarker) {
      setStartMarker(newMarker);
    } else if (!endMarker) {
      setEndMarker(newMarker);
    } else {
    }
  };
  useEffect(() => {
    if (startMarker) {
      setMapCenter({
        lat: startMarker.Latitude,
        lng: startMarker.Longitude,
      });
    } else if (endMarker) {
      setMapCenter({
        lat: endMarker.Latitude,
        lng: endMarker.Longitude,
      });
    }
  }, [startMarker, endMarker]);

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
              position={{
                lat: startMarker.Latitude,
                lng: startMarker.Longitude,
              }}
              label="Start"
              onClick={() => setStartMarker(null)}
            />
          )}
          {endMarker && (
            <Marker
              position={{
                lat: endMarker.Latitude,
                lng: endMarker.Longitude,
              }}
              label="End"
              onClick={() => setEndMarker(null)}
            />
          )}
        </GoogleMap>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          mt: "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Button
          onClick={handleProceedClick}
          disabled={!bothMarkersSelected}
          className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
            bothMarkersSelected ? "" : "cursor-not-allowed"
          }`}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};

export default MapPage;
