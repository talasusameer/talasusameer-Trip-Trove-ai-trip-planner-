import React, { useState, useMemo } from 'react';
import { MapPin, Search } from 'lucide-react';
import MapSection from "./MapSection.jsx";

const TopPlacesToVisit = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlaces = useMemo(() => {
    return places.filter(place =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [places, searchTerm]);

  const placesToShow = selectedPlace ? [selectedPlace] : filteredPlaces;

  return (
    <div id={'top-places-to-visit'} className="bg-gray-900 text-white p-4 rounded-lg border">
      <div className="flex items-center mb-4">
        <MapPin className="mr-2" />
        <h2 className="text-xl font-bold">Top places to visit</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search new location"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredPlaces.map((place, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={() => setSelectedPlace(place)}
              >
                <div>
                  <span className={`mr-2 ${getColorClass(index)}`}>{index + 1}.</span>
                  <span>{place.name}</span>
                </div>
                <button className="p-1 bg-gray-700 rounded">
                  <MapPin size={16} />
                </button>
              </div>
            ))}
            {filteredPlaces.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No places found matching your search.
              </div>
            )}
          </div>
        </div>
        <div className="relative min-h-96 bg-gray-800 rounded-lg overflow-hidden">
          {/* Render the map with the selected or filtered places */}
          <MapSection places={placesToShow} center={placesToShow[0]?.coordinates} />
        </div>
      </div>
    </div>
  );
};

const getColorClass = (index) => {
  const colors = ['text-[#FF5733]', 'text-[#33FF57]', 'text-[#5733FF]', 'text-[#FF33F1]', 'text-[#33FFF1]'];
  return colors[index % colors.length];
};

export default TopPlacesToVisit;
