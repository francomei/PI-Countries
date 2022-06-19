const { Router } = require("express");
const { Activity, Country } = require("../db");
const router = Router()

router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        
    } catch (error) {
        
    }
})
router.get("/:idPais", async (req, res) => {
    const { idPais } = req.params
    try {
        const country = await Country.findByPk(idPais.toUpperCase(), {
            include: {
                model: Activity,
            }
        });
        return res.json(country);
    } catch (error) {
        res.send({msg: error.message});
    }
})

module.exports = router;
