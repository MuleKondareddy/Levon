import React from "react";

const Light = ({ color, isActive }) => {
  return (
    <div
      className={`light ${color} ${isActive ? "active" : ""}`}
      style={{
        backgroundColor: isActive ? color : "#333",
      }}
    ></div>
  );
};

export default Light;
