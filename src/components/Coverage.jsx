import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const coverageCities = [
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Chittagong", lat: 22.3569, lng: 91.7832 },
  { name: "Khulna", lat: 22.8456, lng: 89.5403 },
  { name: "Rajshahi", lat: 24.3636, lng: 88.6241 },
  { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
  { name: "Barishal", lat: 22.7010, lng: 90.3535 }
];

const Coverage = () => {
  return (
    <div className="py-12 px-5 md:px-10 bg-sky-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-sky-600 mb-8">
        Our Delivery Coverage
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map */}
        <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
          <MapContainer center={[23.6850, 90.3563]} zoom={6} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {coverageCities.map((city, idx) => (
              <Marker key={idx} position={[city.lat, city.lng]}>
                <Popup>{city.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Cities list */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Cities We Deliver To:
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            {coverageCities.map((city, idx) => (
              <li key={idx} className="hover:text-sky-600 transition-colors cursor-pointer">
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
