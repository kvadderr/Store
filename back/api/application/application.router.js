const router = require("express").Router();

const {
    getApplication,
    createAppplication,
    updateAppData 
} = require("./application.controller");

router.get("/", getApplication);
router.post("/", createAppplication);
router.put("/", updateAppData);

module.exports = router;