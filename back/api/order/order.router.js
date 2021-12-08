const router = require("express").Router();

const {
    createOrder,
    getData,
    getProducts,
    getClient,
    createClient,
    updateClientData,
    getAllData
} = require("./order.controller");

router.post("/", createOrder);
router.get("/", getData);
router.get("/all", getAllData);
router.get("/:id", getProducts);
router.get("/client/:phone", getClient);
router.post("/client/", createClient);
router.put("/client", updateClientData);

module.exports = router;