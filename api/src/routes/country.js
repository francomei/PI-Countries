const { Router } = require("express");
const { Activity, Country } = require("../db");
const axios = require("axios");
const router = Router();

const getCountries = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map(e => {
    return {
      name: e.name.common,
      id: e.cca3,
      imgFlag: e.flags[1],
      continent: e.continent[0],
      capital: e.capital[0],
      subRegion: e.subRegion,
      area: e.area,
      poblacion: e.poblacion,
    }
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: []
      }
    }
  })
}

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(404).json("No existe el pais");
  try {
    const nameCountry = await Country.findAll(name.toLowerCase(),{
      include: {
        model: Activity,
      },
    });
    res.json(nameCountry);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });
    return res.json(country);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = router;
