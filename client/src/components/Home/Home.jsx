import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries } from "../../actions";
import Card from "../Card/Card";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }

  return (
    <div>
      <Link to="/countries">Crear Pais</Link>
      <h1>Titulo de mi pag</h1>
      <button onClick={handleClick}>Volver a cargar los paises</button>
      <div>
        <select>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europa">Europa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antartida">Antartida</option>
          <option value="America">America</option>
        </select>
      </div>

      {allCountries?.map((c) => {
        return <Card name={c.name} flag={c.flag} continent={c.continent} />;
      })}
    </div>
  );
}
