import React, { useState } from "react";
import "./styles.css";
import Leaflet from "./Leaflet";
import { extractShapes } from "./utils";

export default function App() {
  const [data, setData] = useState(null);

  const handleChange = async (e) => {
    setData(await extractShapes(e.target.files));
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      {data && <Leaflet data={data} />}
    </>
  );
}
