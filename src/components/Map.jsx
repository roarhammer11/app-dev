import React from "react";
import {GoogleMap} from "@react-google-maps/api";
import {useLoadScript} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};
const center = {
  lat: 10.315699,
  lng: 123.885437,
};

export default function GoogleMaps() {
  const {isLoaded, loadError} = useLoadScript({
    // Uncomment the line below and add your API key
    googleMapsApiKey: "AIzaSyAeWNUFMSN3eM88Ey-1mfU3MeahPzIJars",
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div style={{marginLeft: 10 + "rem", marginTop: 8 + "rem"}}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      />
    </div>
  );
}
