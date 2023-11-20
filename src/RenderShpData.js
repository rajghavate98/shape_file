import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function RenderShpData({ data }) {
  const map = useMap();
//   delete L.Icon.Default.prototype._getIconUrl;

//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   });

//   L.Icon.Default.prototype.options.iconSize = [30, 30];
//   L.Icon.Default.prototype.options.shadowSize = [0, 0];

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });

    // const mcg = L.markerClusterGroup();

    L.geoJson(data, {
      pointToLayer: function (f, latLng) {
        // const icon = new L.Icon({
        //   iconUrl: myIcon,
        //   iconSize: [30, 30],
        // });
        return L.marker(latLng);
      },
      style: function (f) {
        return {
          opacity: 0.5,
          fillColor: 'transparent',
          fillOpacity: 0.5,
        };
      },
      onEachFeature: function (f, l) {
        const out = [];
        if (f.properties) {
          for (const key in f.properties) {
            out.push(`${key}: ${f.properties[key]}`);
          }
          l.bindPopup(out.join('<br />'));
        }
      },
    }).addTo(map);

    // map.addLayer(mcg);
  }, [map, data]);

  return null;
}

export default RenderShpData;
