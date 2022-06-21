const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { Activity, Country } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { countries, name, difficulty, duration, season } = req.body;
  try {
    const createActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    
    const findActivity = await Country.findAll({
      where: {
        name: countries,
      },
    });
    createActivity.addCountries(findActivity);
    
    return res.send("actividad creada");

  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.findAll({include: Country});
    return res.status(200).send(activities);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
