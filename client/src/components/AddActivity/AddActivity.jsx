import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getAllActivities } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    dificultad: "",
    duracion: "",
    season: "",
    countries: [],
  });

  function validate() {
    let error = {};
    if (
      !input.name ||
      !input.dificultad ||
      !input.duracion ||
      !input.season ||
      !input.countries
    ) {
      error.name = "Todos los campos son requeridos";
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

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value,
      });
    }
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
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Actividad Creada");
    setInput({
      name: "",
      dificultad: "",
      duracion: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Nombre de la actividad"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <div>
          <label>Dificultad: </label>
          <select
            value={input.dificultad}
            name="dificultad"
            onChange={(e) => handleChange(e)}
          >
            <option value="1">Inicial</option>
            <option value="2">Baja</option>
            <option value="3">Media</option>
            <option value="4">Dificil</option>
            <option value="5">Profesional</option>
          </select>
          {error.name && <p>{error.name}</p>}
        </div>
        <div>
          <label>Duracion: </label>
          <select
            value={input.duracion}
            name="duracion"
            onChange={(e) => handleChange(e)}
          >
            <option value="1">1 hora</option>
            <option value="2">2 horas</option>
            <option value="3">3 horas</option>
            <option value="4">4 horas</option>
            <option value="5">5 horas</option>
          </select>
          {error.name && <p>{error.name}</p>}
        </div>
        <div>
          <label>Temporada: </label>
          <label>
            <input
              type="checkbox"
              value="Verano"
              name="Verano"
              onChange={(e) => handleCheck(e)}
            />
            Verano{" "}
          </label>
          <label>
            <input
              type="checkbox"
              value="Invierno"
              name="Invierno"
              onChange={(e) => handleCheck(e)}
            />
            Invierno{" "}
          </label>
          <label>
            <input
              type="checkbox"
              value="Otoño"
              name="Otoño"
              onChange={(e) => handleCheck(e)}
            />
            Otoño{" "}
          </label>
          <label>
            <input
              type="checkbox"
              value="Primavera"
              name="Primavera"
              onChange={(e) => handleCheck(e)}
            />
            Primavera{" "}
          </label>
          {error.name && <p>{error.name}</p>}
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {countries.map((country) => (
            <option value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <ul><li>{input.countries.map((c) => c + " ,")}</li></ul>


        <button type="submit">Crear Actividad</button>
      </form>
        <div>
          {input.countries.map((country) => (
            <div>
              <button onClick={() => handleDelete(country)}>X</button>
            </div>
          ))}
        </div>
    </div>
  );
}
