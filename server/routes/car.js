const express = require("express");
const router = express.Router();

const {createProduct,listProducts,particularproduct,deleteProduct,updateProduct,searchProducts} = require("../controllers/Car");
const { auth } = require("../middlewares/auth");

router.post("/createproduct",auth,createProduct);
router.get("/listproducts",auth,listProducts);
router.get("/particularproduct/:productId",auth,particularproduct);
router.put("/updateproduct/:productId",auth,updateProduct);
router.delete("/deleteproduct",auth,deleteProduct);
router.post("/searchproduct",auth,searchProducts);

module.exports = router;
