import { FILTER_ACTIVITY, GET_COUNTRIES, ORDER_BY_CONTINENT } from "../actions";

const initialState = {
  countries: [],
  allCountries: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
      };
    case ORDER_BY_CONTINENT:
      const allCountries = state.allCountries
      const orderByContinent = action.payload === "All" ? allCountries : allCountries.filter(c => c.continent === action.payload)
      return {
        ...state,
        countries: orderByContinent
      }
    case FILTER_ACTIVITY:
      const countriesAll = state.allCountries
      const countriesActivities = action.payload === "All" ? countriesAll.filter(c => c.activities) : countriesAll.filter(c => !c.activities)  
      return {
        ...state,
        countries: action.payload === "All" ?state.allCountries : countriesActivities
      }
    default:
        return {
          ...state,
        }
  }
}

export default rootReducer;
