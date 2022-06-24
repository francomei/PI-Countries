import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCountries,
  getAllActivities,
  orderByContinent,
  filterActivity,
  orderByName,
  orderByPopulation,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const[, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  // const [countriesPerPage, setcountriesPerPage] = useState(9);
  var countriesPerPage = 0;
  if (currentPage === 1) {
    countriesPerPage = 9;
  }
  if (currentPage >= 2) {
    countriesPerPage = 10;
  }

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterContinent(e) {
    dispatch(orderByContinent(e.target.value));
  }

  function handleFilterActivity(e) {
    dispatch(filterActivity(e.target.value));
  }

  return (
    <div>
      <Link to="/activities">Crear Actividad</Link>
      <h1>Titulo de mi pag</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar los paises
      </button>
      <div>
        <select onChange={(e) => handleFilterContinent(e)}>
          <option value="All">Todos</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antartida</option>
          <option value="North America">America del Norte</option>
          <option value="South America">America del Sur</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select onChange={(e) => handleSort(e)}>
          <option value="">Nombre Alfabeticamente</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select onChange={(e) => handleSort2(e)}>
          <option value="">Poblacion</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select onChange={(e) => handleFilterActivity(e)}>
          <option value="">Actividades</option>
          <option value="All">All</option>
          {activities && activities.map((a, i) => (
          <option key={i + a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
      </div>
      
      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={countries.length}
        paginate={paginate}
      />
      <SearchBar />
      <div>
        {currentCountry?.map((c) => {
          return <Card name={c.name} flag={c.flag} continent={c.continent} />;
        })}
      </div>
    </div>
  );
}
