import { React, useState, useEffect } from "react";
import "./profilesSection.css";
import ProfileCard from "./Profile Card/ProfileCard";

const ProfilesSection = ({
  list,
  adminView,
  isAdmin,
  onDelete,
  onSummary,
  onEdit,
  onAdd,
}) => {
  console.log("Profiles List: ", list); // Debug
  const [newProfile, setNewProfile] = useState({
    id: 0,
    name: "",
    image: "",
    description: "",
    contact: "",
    address: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Handle input changes for the new profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  // Submit the new profile
  const submitProfile = () => {
    if (
      newProfile.id &&
      newProfile.name &&
      newProfile.image &&
      newProfile.description &&
      newProfile.contact &&
      newProfile.address
    ) {
      console.log("Submitting New Profile: ", newProfile); // Debug
      onAdd(newProfile); // Call the add function passed as a prop
      setNewProfile({
        id: 0,
        name: "",
        image: "",
        description: "",
        contact: "",
        address: "",
      });
      setShowAddForm(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  useEffect(() => {
    console.log("Profiles passed to ProfilesSection:", list);
  }, [list]);
  return (
    <>
      <div className="max-width profile-section">
        <div className="profile-title-add-button">
          <div className="profiles-title">
            <h3>Profiles</h3>
          </div>
          {isAdmin && adminView && !showAddForm && (
            <div
              className="add-button cur-po"
              onClick={() => setShowAddForm(true)}
            >
              Add Profile
            </div>
          )}
        </div>

        {/* Render Add Profile Form */}
        {showAddForm && (
          <div className="add-profile-form">
            <input
              type="number"
              name="id"
              placeholder="Id"
              value={newProfile.id}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProfile.name}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={newProfile.image}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newProfile.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={newProfile.contact}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newProfile.address}
              onChange={handleInputChange}
            />
            <button onClick={submitProfile}>Submit</button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        )}

        <div className="profile-grid">
          {list.map((profile) => {
            console.log('list map', profile)
            return (
              <ProfileCard
                key={profile.id}
                profile={profile}
                adminView={adminView}
                isAdmin={isAdmin}
                onDelete={onDelete}
                onSummary={onSummary}
                onEdit={onEdit}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilesSection;
