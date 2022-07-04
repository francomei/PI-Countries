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
import Styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage,] = useState(10);

  // var countriesPerPage = 0;
  // if (currentPage === 1) {
  //   countriesPerPage = 9;
  // }
  // if (currentPage >= 2) {
  //   countriesPerPage = 10;
  // }

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  function search() {
    setCurrentPage(1);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities());
  }, [dispatch]);

  function handleClick(e) {
    setCurrentPage(1);
    e.preventDefault();
    dispatch(getAllCountries());
  }

  function handleSort(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSort2(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByPopulation(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterContinent(e) {
    setCurrentPage(1);
    dispatch(orderByContinent(e.target.value));
  }

  function handleFilterActivity(e) {
    setCurrentPage(1);
    dispatch(filterActivity(e.target.value));
  }

  return (
    <div className={Styles.allContainer}>
      <div className={Styles.main}>
        <button
          className={Styles.btnReload}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar Paises
        </button>
        <h1>Countries's App</h1>
        <div className={Styles.createAct}>
          <Link to="/activities" className={Styles.link}>
            Crear Actividad
          </Link>
        </div>
      </div>
      <div className={Styles.allFilters}>
        <div className={Styles.filterContainer}>
          <select
            onChange={(e) => handleFilterContinent(e)}
            className={Styles.filters}
          >
            <option selected disabled value="">
              Continentes
            </option>
            <option value="All">Todos</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antartida</option>
            <option value="North America">America del Norte</option>
            <option value="South America">America del Sur</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select onChange={(e) => handleSort(e)} className={Styles.filters}>
            <option selected disabled value="">
              Nombre Alfabeticamente
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select onChange={(e) => handleSort2(e)} className={Styles.filters}>
            <option selected disabled value="">
              Poblacion
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select
            onChange={(e) => handleFilterActivity(e)}
            className={Styles.filters}
          >
            <option selected disabled value="">
              Actividades
            </option>
            {activities?.map((act) => {
              return (
                <option id={act.id} key={act.id} value={act.name}>
                  {act.name}
                </option>
              );
            })}
          </select>
          <div onChange={(e) => search(e)} className={Styles.searchBar}>
            <SearchBar />
          </div>
        </div>
      </div>

      <div className={Styles.card}>
        {currentCountry?.map((country) => {
          return (
            <div className={Styles.link}>
              <Link to={"/detail/" + country.id} className={Styles.link}>
                <Card
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className={Styles.paginate}>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={countries.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
