import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Shapefile from "./Shapefile";
import RenderShpData from "./RenderShpData";

const position = [51.505, -0.09];

function Leaflet({ data }) {
  const [map, setMap] = useState(null);
  var newArr = [];
  for (var i = 0; i < data.length; i++) {
    newArr = newArr.concat(data[i]);
  }
  console.log(newArr);
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
      <GeoJSON attribution="&copy; credits due..." data={newArr} />
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      /> */}
      {/* <Shapefile data={data} /> */}
      {/* <RenderShpData  data={data} /> */}
    </MapContainer>
  );
}

export default Leaflet;
