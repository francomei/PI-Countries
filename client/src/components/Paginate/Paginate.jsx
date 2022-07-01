import React from "react";
import Styles from "./Paginate.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={Styles.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <a
              className={Styles.btn}
              onClick={() => {
                paginate(number);
              }}
            >
              {number}
            </a>
          ))}
      </ul>
    </nav>
  );
}
