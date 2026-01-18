const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
    cloud_name: (process.env.cloud_name || "").trim(),
    api_key: (process.env.CLOUD_API_KEY || "").trim(),
    api_secret: (process.env.CLOUD_API_SECRET || "").trim(),
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pakbites_products",
        allowed_formats: ["jpg", "png", "jpeg", "webp","avif"],
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
