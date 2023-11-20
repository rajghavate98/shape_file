import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function Shapefile({ data }) {
  const map = useMap();
  
  useEffect(() => {
    if (!data || !map) return;
    const geo = L.geoJson(
      { features: [] },
      { style: {color: "red", weight: 2, fillColor: "#1b6f0e", fillOpacity: .1},
        onEachFeature: function popUp(f, l) {
          console.log("first",l)
          var out = [];
          if (f.properties) {
            for (var key in f.properties) {
              out.push(key + ": " + f.properties[key]);
            }
            l.bindPopup(out.join("<br />"));
          }
        }
      }
    ).addTo(map);
  
    console.log(geo)
    geo.addData(data);
    map.fitBounds(geo.getBounds());
  }, [map, data]);

  return null;
}
