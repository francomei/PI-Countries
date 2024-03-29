import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getAllActivities } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./AddActivity.module.css";

export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  function validate() {
    let error = {};
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      !input.countries
    ) {
      error.name = " ** Completa el nombre ** ";
      error.difficulty = " ** Elegi una dificultad ** ";
      error.duration = " ** Elegi una duracion ** ";
      error.season = " ** Elegi una temporada ** ";
      error.countries = " ** Elegi uno o varios paises ** ";
    }
    return error;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e), // filtrame por todo lo qe no sea ese elemento, me devuleve todo sin ese elemento.
    });
  }

  function handleSelect(e) {
    if (input.countries.find((p) => p === e.target.value)) {
      return;
    }
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  }

  function handleSubmit(e) {
    dispatch(postActivity(input));
    // console.log(input);
    alert("Actividad Creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div className={Styles.all}>
      <h1>Crea tu actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={Styles.form}>
        <div className={Styles.inputs}>
          <div className={Styles.name}>
            <label>
              <strong>Nombre:</strong>
            </label>
            <input
              className={Styles.input}
              type="text"
              value={input.name}
              name="name"
              placeholder="Nombre de la actividad"
              onChange={(e) => handleChange(e)}
            />
            {error.name && <p className={Styles.error}>{error.name}</p>}
          </div>
          <div className={Styles.difficulty}>
            <label>
              <strong>Dificultad:</strong>
            </label>
            <select
              className={Styles.input}
              value={input.difficulty}
              name="difficulty"
              onChange={(e) => handleChange(e)}
            >
              <option selected disabled value="">
                Dificultad
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {error.name && <p className={Styles.error}>{error.difficulty}</p>}
          </div>
          <div className={Styles.duration}>
            <label>
              <strong>Duracion:</strong>
            </label>
            <select
              className={Styles.input}
              value={input.duration}
              name="duration"
              onChange={(e) => handleChange(e)}
              required
            >
              <option selected disabled value="">
                Duracion
              </option>
              <option value="1">1 hora</option>
              <option value="2">2 horas</option>
              <option value="3">3 horas</option>
              <option value="4">4 horas</option>
              <option value="5">5 horas</option>
            </select>
            {error.name && <p className={Styles.error}>{error.duration}</p>}
          </div>
          <div className={Styles.season}>
            <label>
              <strong>Temporada:</strong>
            </label>
            <select
              className={Styles.input}
              value={input.season}
              name="season"
              onChange={(e) => handleChange(e)}
              required
            >
              <option selected disabled value="">
              Temporada
              </option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
            {error.name && <p className={Styles.error}>{error.season}</p>}
          </div>
          <div className={Styles.countries}>
            <label>
              <strong>Paises:</strong>
            </label>
            <select className={Styles.input} value={input.countries} onChange={(e) => handleSelect(e)}>
              <option selected disabled value="">
                Elegir Pais
              </option>
              {countries.map((country) => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {error.name && <p className={Styles.error}>{error.countries}</p>}
          </div>
        </div>

        <div className={Styles.countriesSelected}>
          {input.countries.map((country) => (
            <div className={Styles.country} key={country.id}>
              <h4>{country}</h4>
              <input
                type="button"
                onClick={() => handleDelete(country)}
                value="X"
              />
            </div>
          ))}
        </div>

        <input
          type="submit"
          value="Crear Actividad"
          disabled={
            !input.name ||
            !input.difficulty ||
            !input.duration ||
            !input.season ||
            !input.countries
          }
        />
      </form>

      <Link to="/home">
        <button className={Styles.btnHome}>Volver</button>
      </Link>
    </div>
  );
}
