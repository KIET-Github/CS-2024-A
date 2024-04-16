import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../App";

const ReverseGeocode = () => {

  const {dispatch}= useContext(userContext);

  // geolocation
  const [location,setLocation] =useState({
    loaded: false,
    coordinates:{
        lat:"",
        lng:""
    }
  });

  const onSuccess=location=>{
    setLocation({
        loaded:true,
        coordinates:{
            lat: location.coords.latitude,
            lng: location.coords.longitude
        },
    });
  };

  const onFailure=error=>{
    setLocation({
      loaded:false,
      error,
    });
  }
  
  const handleButtonClick = async () => {
    const latitude= location.coordinates.lat;
    const longitude=location.coordinates.lng;
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=2db1aa83396f46a48bc7138745561d10`
      );
      if (response.data.features && response.data.features.length > 0) {
        const address = response.data.features[0].properties.formatted;
        dispatch({type:"location",payload:{city:response.data.features[0].properties.city,postalCode:response.data.features[0].properties.postcode}})
        console.log(response.data.features[0].properties.city);
        console.log(response.data.features[0].properties.postcode);
      } else {
      }
    } catch (error) {
      
    }
  };

  useEffect(()=>{
    if(!("geolocation"in navigator)){
          onFailure({
              code:0,
              message:"GeoLocation not supported"
          })
    }else{
      navigator.geolocation.watchPosition(onSuccess,onFailure,{enableHighAccuracy:true});
    }
      
  },[])

  useEffect(()=>{
    console.log(location);
    if(location.loaded){
      handleButtonClick();
    }
  },[location.loaded])

  return (
    <></>
  );
};

export default ReverseGeocode;
