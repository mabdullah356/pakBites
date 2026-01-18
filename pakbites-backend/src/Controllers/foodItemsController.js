const Product = require("../Models/productModel");

const burgers = require("../Json/Burger.json");
const pizzas = require("../Json/pizzas.json");
const fries = require("../Json/friesSides.json");
const chicken = require("../Json/friedChicken.json");
const sandwiches = require("../Json/sandwiches.json");
const pastas = require("../Json/pastas.json");
const drinks = require("../Json/drinks.json");
const desserts = require("../Json/desserts.json");
const bestSellers = require("../Json/bestSellers.json");
const bestDeals = require("../Json/bestDeals.json");
const comboDeal = require("../Json/combDeals.json");

const formatData = (items, category) => items.map((item) => ({ ...item, category: category.toLowerCase() }));


module.exports.saveAllProducts = async (req, res) => {
  try {
    const all = [
      ...formatData(burgers, "burger"),
      ...formatData(pizzas, "pizza"),
      ...formatData(fries, "fries"),
      ...formatData(chicken, "chicken"),
      ...formatData(sandwiches, "sandwich"),
      ...formatData(pastas, "pasta"),
      ...formatData(drinks, "drink"),
      ...formatData(desserts, "dessert"),
      ...formatData(bestSellers, "bestseller"),
      ...formatData(bestDeals, "deal"),
      ...formatData(comboDeal, "combo")
    ];

    const saved = await Product.insertMany(all);
    res.status(201).json({ message: "All products saved", count: saved.length });
  } catch (error) {
    res.status(500).json({ error: "Save failed", details: error.message });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "Products not found" })
    }
    return res.status(200).json({ success: true, message: "Products found successfully", products })

  } catch (error) {

    res.status(500).json({ error: "Failed to fetch products" });

  }
};

module.exports.getByCategory = async (req, res) => {
  const category = req.params.category.toLowerCase();
  try {
    const items = await Product.find({ category });
    if (!items.length) {
      return res.status(404).json({ message: "No products in this category" });
    }
    res.status(200).json({ items, message: "Products found on the base on category" });

  } catch (error) {

    res.status(500).json({ error: "Failed to fetch category" });
  }
};
module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const toDelete = await Product.findByIdAndDelete(id)
    if (!toDelete) {
      return res.status(401).json({ message: "Product not found" })
    }
    return res.status(200).json({ message: "Product deleted successfully" })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json({ success: true, message: "Product found successfully", product });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, rating, totalItems, items } = req.body;
  let image = req.body.image;

  if (req.file) {
    image = req.file.path;
  }

  try {
    await Product.findByIdAndUpdate(id, { name, price, rating, image, totalItems, items }, { new: true });

    return res.status(200).json({ message: "Product updated successfully" });

  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
}


module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, rating, category, totalItems, items } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = req.file.path;
    }

    if (!image) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists!" });
    }

    const newProduct = new Product({ name, price, category, rating, image, totalItems, items });
    await newProduct.save();

    return res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByIds = async (req, res) => {
  const { ids } = req.body;
  try {
    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
