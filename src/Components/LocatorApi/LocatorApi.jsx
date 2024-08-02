import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './MapStyles.css'

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 4.617155377424506,
  lng: -75.63779493334825
};


const LocatorApi = () => {
  return (
    <div className="shadow-formShadow rounded-mapBorder overflow-hidden custom-map-container">
      <LoadScript googleMapsApiKey="AIzaSyC5JuQhw5nbbfozAd_ATVDepoEyEwpxmQ0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
// AIzaSyC5JuQhw5nbbfozAd_ATVDepoEyEwpxmQ0

export default LocatorApi;
