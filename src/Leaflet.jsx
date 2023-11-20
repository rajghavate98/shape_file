import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Shapefile from "./Shapefile";
import RenderShpData from "./RenderShpData";

const position = [51.505, -0.09];

function Leaflet({ data }) {
  const [map, setMap] = useState(null);
  // data.forEach(element => {
  //   console.log(element)
  // });
  //  console.log(data)
  const getColor = (feature) => {
  //  console.log(feature)
    const featureType = feature.properties.type;
    //  console.log(featureType)
    // Define different colors based on feature type
    switch (featureType) {
      case 'residential':
        return 'red';
      case 'railways':
        return 'blue';
      case 'road':
        return 'green';
      // Add more cases for other feature types as needed
      default:
        return 'gray'; // Default color
    }
  };

  const style = (feature) => {
    return {
      fillColor: getColor(feature),
      weight: 2,
      opacity: 1,
      // color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  useEffect(() => {
    if (map) map.setView([34.74161249883172, 18.6328125], 2);
  }, [map]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh" }}
      ref={setMap}
    >
      <GeoJSON attribution="&copy; credits due..." data={data} />
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      /> */}
      {/* <Shapefile data={data}/> */}
      {/* <RenderShpData  data={data} /> */}
    </MapContainer>
  );
}

export default Leaflet;
