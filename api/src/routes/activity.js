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
    // res.json(createActivity);
    const findActivity = await Activity.findAll({
      where: {
        name: countries,
      },
    });
    createActivity.addCountries(findActivity);
    res.send(createActivity);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = router;
