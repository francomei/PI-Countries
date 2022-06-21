import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";

export function getAllCountries(){
    return async function(dispatch){
        var response = await axios ("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: response.data
        })
    }
}