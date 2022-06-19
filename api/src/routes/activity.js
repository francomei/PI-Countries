const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { Activity, Country } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
    const {countries, name, dificulty, duration, season} = req.body;
})

module.exports = router;