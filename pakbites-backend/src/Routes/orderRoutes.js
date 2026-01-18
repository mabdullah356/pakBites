const express = require("express");
const router = express.Router();
const { isUserLogin, isAdminLogin } = require("../Middlewares/authMiddleware");
const {orderNow, getAllOrders, getMyOrders, deleteOrder, updateOrder, getTotalProductQuantity } = require("../Controllers/orderController");

router.post("/order-now", isUserLogin, orderNow);
router.get("/orders", isAdminLogin, getAllOrders);
router.get("/get-my-orders", isUserLogin, getMyOrders);
router.delete("/:id", isAdminLogin, deleteOrder);
router.put("/:id", isAdminLogin, updateOrder);
router.get("/get-total-product-quantity/:productName", isAdminLogin, getTotalProductQuantity);

module.exports = router;