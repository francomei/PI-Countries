const { Router } = require("express");
const { Activity, Country } = require("../db");
const axios = require("axios");
const router = Router();

const getCountries = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name.common,
      id: e.cca3,
      flag: e.flags[1],
      continent: e.continents,
      capital: e.capital,
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllCountries = async () => {
  const apiInfo = await getCountries();
  const dbInfo = await getDbInfo();
  const result = apiInfo.concat(dbInfo);
  return result;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allCountries = await getCountries();
  try {
    if (name) {
      const nameCountry = await allCountries.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      nameCountry.length
        ? res.status(200).json(nameCountry)
        : res.status(404).json("No existe el pais");
    } else {
      res.json(allCountries);
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {

  const { id } = req.params;
  const allCountries = await getAllCountries();
  if(id) {
    let countryId = await allCountries.filter(e => e.id.toUpperCase() == id.toUpperCase())
    
    countryId.length ?
    res.json(countryId) :
    res.json("no existe")
  }

  // const { id } = req.params;
  // try {
  //   const country = await Country.findByPk(id, {
  //     include: {
  //       model: Activity  
  //      },
  //   });
  //   if (country !== null) {
  //     return res.json(country);
  //   } else {
  //     return res.status(400).json("no existe el id");
  //   }
  // } catch (error) {
  //   res.send({ msg: error.message });
  // }

});

module.exports = router;
