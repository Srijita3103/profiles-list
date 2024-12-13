import { useState } from "react";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ProfilesSection from "../../Components/Profiles Section";
import { profiles as initialProfiles } from "../../data/Profiles";
import "./home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [profiles, setProfiles] = useState(initialProfiles);
  const [popupData, setPopupData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: "",
    image: "",
    description: "",
    contact: "",
    address: { lat: 0, lng: 0, location: "" },
  });

  const adminCredentials = {
    username: "admin",
    password: "admin123",
  };
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginDetails.username === adminCredentials.username &&
      loginDetails.password === adminCredentials.password
    ) {
      setIsAdmin(true);
      setAdminView(true);
      setShowLogin(false);
      alert("Logged in as Admin!");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminView(false);
    setLoginDetails({ username: "", password: "" });
    alert("Logged out");
  };

  const handleSummary = (id, address) => {
    console.log("id from summary", id, address);
    setPopupData({ id, address });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const FloatingPopup = ({ id, address, onClose }) => {
    useEffect(() => {}, []);
    return (
      <div className="login-form-container">
        <div className="login-form">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Summary</h2>
          <p>ID: {id}</p>
          <p>Address: {address.location}</p>
          <MapContainer
            center={[address.lat, address.lng]}
            zoom={13}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[address.lat, address.lng]}>
              <Popup>{address.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  };

  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  const handleEdit = (profile) => {
    setEditData(profile);
  };

  const closeEditPopup = () => {
    setEditData(null);
  };

  const saveEdit = () => {
    const updatedProfiles = profiles.map((profile) =>
      profile.id === editData.id ? editData : profile
    );
    setProfiles(updatedProfiles);
    closeEditPopup();
    console.log("Updated Profiles:", JSON.stringify(updatedProfiles, null, 2));
  };

  let filteredProfiles = profiles.filter(
    (profile) =>
      profile.name &&
      profile.name.toLowerCase().includes(search.toLowerCase()) &&
      profile.address.location &&
      profile.address.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase())
  );

  const handleAdd = (newProfile) => {
    const updatedProfiles = [
      ...profiles,
      { id: profiles.length + 1, ...newProfile },
    ];
    setProfiles(updatedProfiles); // Updates the profiles state
  };

  return (
    <div>
      <div className="header-section">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          className="name-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          className="location-search"
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        {!isAdmin ? (
          <button className="admin-button" onClick={() => setShowLogin(true)}>
            Admin
          </button>
        ) : (
          <div>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
            <button
              className={`btn ${adminView ? "btn-danger" : "btn-primary"}`}
              onClick={() => setAdminView(!adminView)}
            >
              {adminView ? "Exit Admin Panel" : "Admin Panel"}
            </button>
          </div>
        )}
      </div>

      {showLogin && (
        <div className="login-form-container">
          <form onSubmit={handleLogin} className="login-form">
            <h4 className="admin-login-title">Admin Login</h4>
            <input
              type="text"
              placeholder="Username"
              value={loginDetails.username}
              className="input-username"
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginDetails.password}
              className="input-password"
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
              required
            />
            <div className="login-cancel-button-div">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setShowLogin(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {popupData && (
        <FloatingPopup
          id={popupData.id}
          address={popupData.address}
          onClose={closePopup}
        />
      )}

      {editData && (
        <div className="login-form-container">
          <div className="login-form">
            <span className="close" onClick={closeEditPopup}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={editData.address.location}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address: { ...editData.address, location: e.target.value },
                })
              }
            />
            <div className="login-cancel-button-div">
              <button className="btn btn-primary" onClick={saveEdit}>
                Save
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={closeEditPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ProfilesSection
        list={filteredProfiles}
        adminView={adminView}
        isAdmin={isAdmin}
        onDelete={handleDelete}
        onSummary={handleSummary}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Home;
