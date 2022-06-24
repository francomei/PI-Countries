import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // yo voy a estar guardando lo que tipea el usuario en mi estado local name

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) { // aca despacho mi accion
    e.preventDefault();
    dispatch(getCountriesByName(name));
    // setName("")
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Pais..."
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
