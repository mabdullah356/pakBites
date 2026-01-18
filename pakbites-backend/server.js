require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/Utils/connectDb");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}.`));
connectDB();