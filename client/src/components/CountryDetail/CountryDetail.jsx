import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail, resetDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./CountryDetail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(resetDetail());
  }, [dispatch, props.match.params.id]);

  return (
    <div className={Styles.detail}>
      {Object.keys(countryDetail).length ? (
        <div className={Styles.country}>
          <img className={Styles.flag} src={countryDetail.flag} alt="flag" />
          <div className={Styles.countries}>
            <h1>{countryDetail.name}</h1>
            <h2>({countryDetail.id})</h2>
            <h2>Capital: {countryDetail.capital}</h2>
            <h2>Continent: {countryDetail.continent}</h2>
            <h2>Subregion: {countryDetail.subregion}</h2>
            <h2>Area: {countryDetail.area} Km2</h2>
            <h2>Poblacion: {countryDetail.population}</h2>
          </div>
          <div className={Styles.activities}>
            <h2 className={Styles.nombreactivity}>Actividades:</h2>
            {countryDetail.activities?.map((activity) => {
              return (
                <div>
                  <h3 className={Styles.aName}>{activity.name}</h3>
                  <h3>Dificultad: {activity.difficulty}</h3>
                  <h3>Duracion: {activity.duration}</h3>
                  <h3>Temporada: {activity.season}</h3>
                </div>
              );
             })}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
      <div>
        <Link to="/home">
          <button className={Styles.btn}>Volver</button>
        </Link>
        <Link to="/activities">
          <button className={Styles.btn}>Crear Actividad</button>
        </Link>
      </div>
    </div>
  );
}
