import React from 'react';
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

const MapSection = ({ places, center }) => {
  return (
    <div className="h-full w-full bg-gray-800 rounded-lg overflow-hidden">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_PLACES_API}>
        <Map center={center} defaultZoom={12} mapId={import.meta.env.VITE_MAP_ID}>
          {places.map((place, index) => (
            <AdvancedMarker
              key={place.name}
              position={place.coordinates}
              title={place.name}
            >
              <Pin
                background={getColorClass(index)}
                glyphColor={'#FFF'}
                borderColor={'#000'}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

const getColorClass = (index) => {
  const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33F1', '#33FFF1'];
  return colors[index % colors.length];
};

export default MapSection;
