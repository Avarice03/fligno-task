import React from "react";
import chef from "../components/images/chef.png";

const UserCard = ({ name, details, selected, handleSelect }) => {
  const isSelected = details === selected;
  return (
    <div
      className={`userCard-wrapper ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect(details)}
    >
      <img className="avatar-placeholder" src={chef} alt="chef avatar"></img>
      <span>{name}</span>
    </div>
  );
};

export default UserCard;
