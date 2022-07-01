import React from "react";
import Styles from "./Card.module.css"

export default function Card({ flag, name, continent }) {
  return (
    <div className={Styles.card}>
      <h3>{name}</h3>
      <h3>{continent}</h3>
      <img src={flag} alt="Flag" />
    </div>
  );
}
