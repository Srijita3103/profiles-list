import React from "react";
import "./profileCard.css";

const ProfileCard = ({
  profile,
  adminView,
  isAdmin,
  onDelete,
  onSummary,
  onEdit,
}) => {
  return (
    <div className="profile-card ">
      <div className="profile-card-cover">
        <img
          src={profile.image}
          alt={profile.name}
          className="profile-card-image cur-po"
        />
      </div>
      <div className="profile-row cur-po">
        <div className="profile-name">{profile.name}</div>
      </div>
      <div className="profile-row">
        <div className="profile-description">{profile.description}</div>
      </div>
      <div className="profile-row">
        <div className="profile-contact cur-po">{profile.contact}</div>
      </div>
      <div className="profile-row">
        <div className="profile-location cur-po">
          {profile.address.location}
        </div>
      </div>
      <button
        className="summary-button cur-po"
        onClick={() => onSummary(profile.id, profile.address)}
      >
        Summary
      </button>
      {isAdmin && adminView && (
        <div className="aed-buttons">
          <button className="add-button">Add</button>
          <button className="edit-button" onClick={() => onEdit(profile)}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => onDelete(profile.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
