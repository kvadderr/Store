const router = require("express").Router();

const {
    getProducts,
    createProduct,
    updateProducts,
    deleteProducts 
} = require("./store.controller");

router.get("/", getProducts);
router.put("/", updateProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProducts);
module.exports = router;