const express = require("express");
const router = express.Router();
const {
  saveAllProducts,
  getAllProducts,
  getByCategory,
  deleteProduct,
  getProductById,
  updateProductById,
  createProduct,
  getProductsByIds
} = require("../Controllers/foodItemsController");

const { upload } = require("../Utils/cloudinary");
const { isAdminLogin } = require("../Middlewares/authMiddleware");

router.post("/save/all", isAdminLogin, saveAllProducts);
router.get("/get/all", getAllProducts);
router.get("/category/:category", getByCategory);
router.delete("/:id", isAdminLogin, deleteProduct);
router.get("/:id", getProductById);
router.post("/getproductsbyids", getProductsByIds);
router.put("/:id", isAdminLogin, upload.single("image"), updateProductById);
router.post("/product", isAdminLogin, upload.single("image"), createProduct);


module.exports = router;
