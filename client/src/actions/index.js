import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const ORDER_BY_CONTINENT = "ORDER_BY_CONTINENT";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";

export function getAllCountries() {
  return async function (dispatch) {
    var response = await axios("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: response.data,
    });
  };
}

export function orderByContinent(payload) {
  return {
    type: ORDER_BY_CONTINENT,
    payload,
  };
}

export function filterActivity(payload) {
  return {
    type: FILTER_ACTIVITY,
    payload
  }
}