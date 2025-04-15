import React, { useState, useRef } from "react";
import axios from "axios";
import { LoadScript, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import Bin from "../assets/bin.png"; // Adjust path if needed
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};
const indiaCenter = { lat: 22.5937, lng: 78.9629 }; // Center of India

const Public = () => {
  const [dumpType, setDumpType] = useState("");
  const [estimatedSize, setEstimatedSize] = useState("");
  const [location, setLocation] = useState("");
  const [complaint, setComplaint] = useState("");
  const [nearestYard, setNearestYard] = useState("");
  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(indiaCenter);
  const autocompleteRef = useRef(null);

  const garbageYards = ["Yard A", "Yard B", "Yard C"];

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address;

      setMarker({ lat, lng });
      setMapCenter({ lat, lng });
      setLocation(address);
    }
  };

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker({ lat, lng });
    setMapCenter({ lat, lng });

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      if (response.data.results[0]) {
        setLocation(response.data.results[0].formatted_address);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!dumpType || !estimatedSize || !location || !nearestYard || !complaint) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/complaints/add", {
        dumpType,
        estimatedSize,
        location,
        nearestYard,
        complaint,
      },{withCredentials:true});

      if (response.status === 201) {
        alert("✅ Complaint submitted successfully!");
        resetForm();
        window.location.href = "/PublicDashboard";
      }
    } catch (error) {
      alert("Error submitting complaint: " + error.message);
    }
  };

  const resetForm = () => {
    setDumpType("");
    setEstimatedSize("");
    setLocation("");
    setComplaint("");
    setNearestYard("");
    setMarker(null);
    setMapCenter(indiaCenter);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e6f4ea", padding: "40px" }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "10px",
        padding: "30px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}>
        <h2 style={{ textAlign: "center", color: "#2f855a", marginBottom: "10px" }}>Keep Our Society Clean</h2>
        <p style={{ textAlign: "center", marginBottom: "30px", color: "#444" }}>
          Help us by reporting garbage spots. Your complaint can make a difference!
        </p>

        {/* Garbage Type */}
        <label style={{ fontWeight: "bold" }}>Select the type of garbage:</label>
        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
          {["Organic", "Inorganic", "Other"].map((type) => (
            <div key={type} style={{ textAlign: "center" }}>
              <img src={Bin} alt={type} style={{ width: "40px", height: "40px" }} />
              <button
                onClick={() => setDumpType(type)}
                style={{
                  marginTop: "5px",
                  backgroundColor: dumpType === type ? "#2f855a" : "#c6f6d5",
                  color: dumpType === type ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                {type}
              </button>
            </div>
          ))}
        </div>

        {/* Estimated Size */}
        <label style={{ fontWeight: "bold" }}>Estimated Size</label>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "15px 0" }}>
          {["XL", "Large", "Medium", "Small"].map((size) => (
            <button
              key={size}
              onClick={() => setEstimatedSize(size)}
              style={{
                backgroundColor: estimatedSize === size ? "#2f855a" : "#c6f6d5",
                color: estimatedSize === size ? "#fff" : "#000",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Location Input + Map */}
        <LoadScript googleMapsApiKey={apiKey||""} libraries={libraries}>
          <label style={{ fontWeight: "bold" }}>Location (Search or Click on Map):</label>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search your location"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "20px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={5.5}
            onClick={handleMapClick}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </LoadScript>

        {/* Nearest Yard */}
        <label style={{ fontWeight: "bold", marginTop: "20px" }}>Nearest Garbage Yard</label>
        <select
          value={nearestYard}
          onChange={(e) => setNearestYard(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Yard</option>
          {garbageYards.map((yard, index) => (
            <option key={index} value={yard}>{yard}</option>
          ))}
        </select>

        {/* Complaint */}
        <label style={{ fontWeight: "bold", marginTop: "20px" }}>Complaint</label>
        <textarea
          rows="3"
          placeholder="Describe the issue..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Submit */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#2f855a",
              color: "#fff",
              padding: "12px 24px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

export default Public;
