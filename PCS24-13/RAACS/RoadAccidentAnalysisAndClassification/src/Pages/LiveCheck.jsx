~import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Maps, { computeDistance, interpolate } from "react-maps-suite";
import { Box } from "theme-ui";
import { Typography } from "@material-tailwind/react";

const defaultCenter = {
  lat: 18.562663708833288,
  lng: -68.3960594399559,
};

const defaultZoom = 15;
const defaultPath = [
  { lat: 18.562093938563784, lng: -68.40836660716829 },
  { lat: 18.560995497953385, lng: -68.40230123938906 },
  { lat: 18.56022251698875, lng: -68.39839594306338 },
  { lat: 18.559408849032664, lng: -68.39431898536074 },
  { lat: 18.55916474788931, lng: -68.39187281073916 },
  { lat: 18.558920646396807, lng: -68.39049951972353 },
  { lat: 18.557984920774317, lng: -68.38942663611758 },
  { lat: 18.55794423693522, lng: -68.3884395832001 },
].reduce((result, item, index, array) => {
  if (index === 0) {
    result.push({ ...item, distance: 0 });
    return result;
  }

  const { distance: lastDistance } = result[index - 1];
  const previous = array[index - 1];
  const distance = lastDistance + computeDistance(previous, item);

  result.push({ ...item, distance });
  return result;
}, []);

const DEFAULT_SPEED = 6; // m/s

function App() {
  const [severity, setSeverity] = useState(null);
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);
  const calcSeverity = async (position) => {
    let noOfVehicles = 1;
    if (count % 100 === 0) {
      noOfVehicles = Math.floor(Math.random() * 3) + 1;
    }
    const response = await axios.post("/predict", {
      startLat: position.lat,
      startLong: position.lng,
      Day_of_Week: 2,
      Number_of_Vehicles: noOfVehicles,
    });
    const { severity_index } = response.data;
    setSeverity((prevSeverity) => severity_index);
    setCount((prevCount) => prevCount + 1);
  };

  const increaseTime = useCallback(() => {
    setTime((time) => time + 2);
  }, []);

  useEffect(() => {
    const interval = setInterval(increaseTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [increaseTime]);

  const distance = DEFAULT_SPEED * time;

  const position = getPositionAt(defaultPath, distance);
  //   console.log("Pos:", position);

  calcSeverity(position);

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
      <Typography variant="h2" color="white" className="text-center mb-4 mt-4">
        Live Severity Simulation
      </Typography>
      <Maps
        provider="google"
        height={400}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        googleLoaderOptions={{
          apiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
        }}
        //   onClick={onClick}
      >
        <Maps.Marker
          position={position}
          imageUrl="https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png"
          size={{ width: 40, height: 40 }}
        />
        <Maps.Polyline path={defaultPath} strokeColor="#4287f5" />
      </Maps>
      <Box
        sx={{
          // Center the notification banner over the map
          position: "fixed",
          top: "85%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Center horizontally and vertically
          zIndex: 3,
          background: severity == 3 ? "red" : "yellow",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "5px",
          width: "200px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p className="text-md">
          Severity Index: <strong>{severity}</strong>
        </p>
      </Box>
    </Box>
  );
}

function getPositionAt(path, distance) {
  const indexesPassed = path.filter((position) => position.distance < distance);
  if (indexesPassed.length === 0) {
    return path[0]; // starting position
  }

  const lastIndexPassed = indexesPassed.length - 1;
  const nextIndexToPass = lastIndexPassed + 1;

  const lastPosition = path[lastIndexPassed];
  const nextPosition = path[nextIndexToPass];

  if (!nextPosition) {
    return lastPosition; // distance is greater than the ones we have in the array
  }

  const progressUntilNext =
    (distance - lastPosition.distance) / nextPosition.distance;

  const currentPosition = interpolate(
    lastPosition,
    nextPosition,
    progressUntilNext
  );

  return currentPosition;
}

export default App;
