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

router.get("/", getAllProducts);
router.post("/seed", isAdminLogin, saveAllProducts);
router.post("/batch", getProductsByIds);
router.post("/", isAdminLogin, upload.single("image"), createProduct);
router.get("/category/:category", getByCategory);
router.get("/:id", getProductById);
router.put("/:id", isAdminLogin, upload.single("image"), updateProductById);
router.delete("/:id", isAdminLogin, deleteProduct);

module.exports = router;
