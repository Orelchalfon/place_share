import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import "./Map.css";
function Map(props)
{
  const mapRef = useRef(),
    { center, zoom } = props;

  useEffect(() =>
  {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
    </div>
  );
}

export default Map;
Map.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import 'dotenv/config';
// import PropTypes from "prop-types";
// import { useState } from 'react';
// import './Map.css';
// export default function Map(props)
// {
//   const { center, zoom } = props;
//   const [map, setMap] = useState(null);
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//     libraries: ['places']
//   });
//   if (!isLoaded) return <div>Loading</div>
//   return (
//     <GoogleMap
//       center={center}
//       zoom={zoom}
//       onLoad={map => setMap(map)}
//       mapContainerStyle={{ height: "100%", width: "100%" }}
//     >
//       <Marker position={center} />


//     </GoogleMap>
//   );
// }
