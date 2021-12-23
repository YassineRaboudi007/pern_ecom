const router = require("express").Router();
const ProductController = require("../controller/product.controller");

router.get("/", ProductController.getAllProducts);
router.post("/Add", ProductController.addProduct);
router.get("/ListOfProdsByIds", ProductController.getListByIds);
router.delete("/delete", ProductController.deleteProduct);
router.put("/update", ProductController.updateProdById);
router.get("/:id", ProductController.getProdById);

module.exports = router;
