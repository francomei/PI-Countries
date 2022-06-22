import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries, orderByContinent } from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginate/Paginate";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  // const [countriesPerPage, setcountriesPerPage] = useState(9);
  
  var countriesPerPage = 0
  if(currentPage === 1){
    countriesPerPage = 9
  } 
  if(currentPage >= 2){
    countriesPerPage = 10
  }
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }
  
  function filterContinent(e) {
    dispatch(orderByContinent(e.target.value));
  }

  return (
    <div>
      <Link to="/countries">Crear Actividad</Link>
      <h1>Titulo de mi pag</h1>
      <button onClick={e => {handleClick(e)}}>Volver a cargar los paises</button>
      <div>
        <select onChange={e => filterContinent(e)}>
          <option selected disabled>Continents</option>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antartida</option>
          <option value="North America">America del Norte</option>
          <option value="South America">America del Sur</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select>
          <option selected disabled="disabled">Population</option>
          <option value="Highest">Highest</option>
          <option value="Lower">Lower</option>
        </select>
      </div>
      <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginate={paginate} />
      <div>
        {currentCountry?.map((c) => {
          return <Card name={c.name} flag={c.flag} continent={c.continent} />;
        })}
      </div>
    </div>
  );
}
