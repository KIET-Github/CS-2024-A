import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Circle,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Box, Heading } from "theme-ui";
import VisualizationModal from "../components/VisualizationModal";

const Analysis = () => {
  const location = useLocation();
  const severityCircles = [
    {
      severity: 1,
      color: "green",
      radius: 1000,
    },
    {
      severity: 2,
      color: "yellow",
      radius: 1000,
    },
    {
      severity: 3,
      color: "red",
      radius: 1000,
    },
  ];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
  });

  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [prediction, setPrediction] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const pred = query.get("severity_index");
    const avgLat = parseFloat(query.get("average_latitude"));
    const avgLng = parseFloat(query.get("average_longitude"));
    setPrediction(parseInt(pred)); // Parse prediction as an integer
    setMapCenter({ lat: avgLat, lng: avgLng });
  }, [location.search]);
  if (loadError) return <h1>Error loading maps</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const openModal = (circle) => {
    setSelectedCircle(circle);
    setIsModalOpen(true);
  };

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
          Severity Level: {prediction}
        </Heading>
      </Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <GoogleMap
          zoom={14}
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={mapCenter}
          onLoad={handleMapLoad}
        >
          {map &&
            severityCircles.map((circle) => {
              if (prediction === circle.severity) {
                return (
                  <React.Fragment key={circle.severity}>
                    <Circle
                      map={map}
                      center={mapCenter}
                      radius={circle.radius}
                      options={{
                        strokeColor: "transparent",
                        fillColor: circle.color,
                      }}
                      onClick={() => openModal(circle)}
                    />
                  </React.Fragment>
                );
              }
              return null;
            })}
          <Marker
            position={{
              lat: 51.52962751811674,
              lng: -0.14877940515756416,
            }}
          />
        </GoogleMap>
        <VisualizationModal
          speedLimit={40}
          severityIndex={prediction}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          circle={selectedCircle}
          latitude={mapCenter.lat}
          longitude={mapCenter.lng}
          apiKey={import.meta.env.VITE_REACT_APP_OPEN_WEATHER_MAP_API_KEY}
        />
      </Box>
    </Box>
  );
};

export default Analysis;
