import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, Hospital, Loader, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";

const FOURSQUARE_API_KEY = "fsq35Czm7RhfGXi3pkIFhd2G8AvsJFgsotVgInUuYZZ6l8I=";

const HospitalLocator = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 34.1697,
    lng: 73.2215,
  });
  const [pharmacies, setPharmacies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const getNearbyPharmacies = async (latitude, longitude) => {
    const url = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=5000&categories=4bf58dd8d48988d10f951735,4bf58dd8d48988d196941735&limit=10`;
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: FOURSQUARE_API_KEY,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Failed to fetch pharmacies.");
        return [];
      }

      return data.results || [];
    } catch (error) {
      setErrorMessage(
        "Error fetching pharmacies. Please try again later.",
        error
      );
      return [];
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          const pharmacies = await getNearbyPharmacies(latitude, longitude);
          setPharmacies(pharmacies);
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setErrorMessage(
            "Unable to get your location. Using default location."
          );
          handleGeolocationError();
        }
      );
    } else {
      setErrorMessage(
        "Geolocation is not supported by your browser. Using default location."
      );
      handleGeolocationError();
    }
  };

  const handleGeolocationError = async () => {
    // Use default location
    const { lat, lng } = currentPosition;
    const pharmacies = await getNearbyPharmacies(lat, lng);
    setPharmacies(pharmacies);
    setIsLoading(false);
  };

  const initializeMap = () => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [currentPosition.lat, currentPosition.lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView([currentPosition.lat, currentPosition.lng], 13);
    }

    markersRef.current.forEach((marker) => mapRef.current.removeLayer(marker));
    markersRef.current = [];

    const userIcon = L.divIcon({
      html: '<div class="user-marker"></div>',
      className: "user-marker-container",
      iconSize: [20, 20],
    });

    const userMarker = L.marker([currentPosition.lat, currentPosition.lng], {
      icon: userIcon,
    })
      .addTo(mapRef.current)
      .bindPopup("You are here")
      .openPopup();
    markersRef.current.push(userMarker);

    const pharmacyIcon = L.divIcon({
      html: '<div class="pharmacy-marker"></div>',
      className: "pharmacy-marker-container",
      iconSize: [20, 20],
    });

    pharmacies.forEach((pharmacy) => {
      const { geocodes, name } = pharmacy;
      if (geocodes?.main?.latitude && geocodes?.main?.longitude) {
        const marker = L.marker(
          [geocodes.main.latitude, geocodes.main.longitude],
          { icon: pharmacyIcon }
        )
          .addTo(mapRef.current)
          .bindPopup(name);
        markersRef.current.push(marker);
      }
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      initializeMap();
    }
  }, [currentPosition, pharmacies, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <motion.h1
          className="text-4xl font-bold text-center text-indigo-800 mb-8 mt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hospital Locator
        </motion.h1>

        <motion.div
          className="bg-white rounded-lg shadow-xl overflow-hidden mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div id="map" className="h-[400px] w-full"></div>
        </motion.div>

        <motion.button
          className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center mb-6"
          onClick={getCurrentLocation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Crosshair className="mr-2" />
          Refresh Location
        </motion.button>

        <motion.div
          className="bg-white rounded-lg shadow-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center">
            <Hospital className="mr-2" /> Nearby Hospitals:
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin mr-2" />
              <p>Loading nearby hospitals...</p>
            </div>
          ) : pharmacies.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pharmacies.map((pharmacy, index) => (
                <motion.li
                  key={index}
                  className="bg-indigo-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="font-semibold text-indigo-700 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    {pharmacy.name}
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No hospitals found near this location.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalLocator;
