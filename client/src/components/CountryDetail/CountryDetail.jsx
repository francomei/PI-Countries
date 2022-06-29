import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail, resetDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

export default function Detail(props) {
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(resetDetail())
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      {Object.keys(countryDetail).length ? (
        <div>
          <div>
            <img src={countryDetail.flag} alt="flag" />
            <h1>{countryDetail.name}</h1>
            <h2>ID: {countryDetail.id}</h2>
            <h2>Capital: {countryDetail.capital}</h2>
            <h2>Continent: {countryDetail.continent}</h2>
            <h2>Subregion: {countryDetail.subregion}</h2>
            <h2>Area: {countryDetail.area} Km2</h2>
            <h2>Poblacion: {countryDetail.population}</h2>
          </div>
          <div>
            <h2>Activities:</h2>
            {countryDetail.activities?.map((activity) => {
              return (
                <div> 
                  <h3>{activity.name}</h3>
                  <h3>Dificultad: {activity.difficulty}</h3>
                  <h3>Duracion: {activity.duration}</h3>
                  <h3>Temporada: {activity.season}</h3>
                </div>
              );
            })}
          </div>
          <Link to="/activities">Create Activity</Link>
          <Link to="/home">
            <button>Volver</button>
          </Link>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
