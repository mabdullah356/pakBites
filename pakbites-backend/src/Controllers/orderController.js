const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const Sale = require("../Models/salesModel");

module.exports.orderNow = async (req, res) => {
  const {
    items, 
    fullName,
    address,
    city,
    postalCode,
    country,
    phoneNo,
    email,
    paymentMethod,
    deliveryDate,
    orderNote,
  } = req.body;


  try {

    if (!items || items.length === 0 || !email || !fullName || !address || !city || !phoneNo) {
      return res.status(400).json({
        error: "Missing required fields. Please provide all necessary information.",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found!` });
      }
      const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
      const price = product.price;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        productQuantity: quantity,
        productPrice: price,
        productImage: product.image
      });

      totalAmount += price * quantity;
    }

    const newOrder = new Order({
      userId:req.user._id,
      items: orderItems,
      totalAmount,
      fullName,
      address,
      city,
      postalCode,
      email,
      country: country || "Pakistan",
      phoneNo,
      paymentMethod: paymentMethod || "CashOnDelivery",
      deliveryDate,
      orderStatus: "Processing",
      orderNote,
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: savedOrder._id,
      orderDetails: savedOrder,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 });
    if(!allOrders){
      return res.status(404).json({message:"Orders not found"})
    }
    return res.status(200).json({message:"Orders found successfully",success:true,orders:allOrders});

  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const toDelete =await Order.findByIdAndDelete(id);
    if(!toDelete){
      return res.status(404).json({message:"Order not found"})
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

module.exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const newStatus = order.orderStatus === "Processing" ? "Delivered" : "Processing";
    order.orderStatus = newStatus;
    await order.save({ validateBeforeSave: false });

    if (order.orderStatus === "Delivered") {
      const saleExists = await Sale.findOne({ orderId: order._id });
      if (!saleExists) {
        const items = order.items || [{
          productId: order.productId,
          productName: order.productName,
          quantity: order.productQuantity,
          price: order.productPrice
        }];

        const saleItems = items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity || item.productQuantity,
          price: item.price || item.productPrice
        }));

        const newSale = new Sale({
          orderId: order._id,
          userId: order.userId,
          items: saleItems,
          email: order.email,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
        });

        await newSale.save({ validateBeforeSave: false });
      }
    }

    return res.status(200).json({
      message: `Order status updated to ${newStatus}`,
    });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

module.exports.getMyOrders = async (req, res) => {
  try {
 
    const orders = await Order.find({ userId:req.user._id }).sort({ createdAt: -1 });
    if(!orders){
      return res.status(404).json({message:"Orders not found"})
    }
    return res.status(200).json({success:true,message:"Orders found successfully",orders});
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getTotalProductQuantity = async (req, res) => {
  try {
    const { productName } = req.params;
    const orders = await Order.find();
    let totalQuantity = 0;

    for (const order of orders) {
      for (const item of order.items) {
        if (item.productName.toLowerCase() === productName.toLowerCase()) {
          totalQuantity += Number(item.productQuantity || 0);
        }
      }
    }
    return res.json({ totalQuantity });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
