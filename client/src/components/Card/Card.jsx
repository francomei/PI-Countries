import React from "react";

export default function Card({ flag, name, continent }) {
  return (
    <div>
      <h3>{name}</h3>
      <h3>{continent}</h3>
      <img src={flag} alt="Flag" />
    </div>
  );
}
