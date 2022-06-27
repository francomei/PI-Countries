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
      {countryDetail.length ? (
        <div>
          <div>
            <img src={countryDetail[0].flag} alt="flag" />
            <h1>{countryDetail[0].name}</h1>
            <h2>ID: {countryDetail[0].id}</h2>
            <h2>Capital: {countryDetail[0].capital}</h2>
            <h2>Continent: {countryDetail[0].continent}</h2>
            <h2>Subregion: {countryDetail[0].subregion}</h2>
            <h2>Area: {countryDetail[0].area} Km2</h2>
            <h2>Poblacion: {countryDetail[0].population}</h2>
          </div>
          <div>
            {countryDetail[0].activities?.map((activity) => {
              return (
                <div>
                  <Link to="/activities">Create Activity</Link>
                  <h3>{activity.name}</h3>
                  <h3>Dificultad: {activity.difficulty}</h3>
                  <h3>Duracion: {activity.duration}</h3>
                  <h3>Temporada: {activity.season}</h3>
                </div>
              );
            })}
          </div>
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
