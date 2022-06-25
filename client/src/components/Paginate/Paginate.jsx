import React from "react";
import "./Paginate.module.css"

export default function Paginado({ countriesPerPage, allCountries, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li>
              <a onClick={() => {paginate(number)}}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
