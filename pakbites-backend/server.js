require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/Utils/connectDb");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}.`));
  })
  .catch((error) => {
    console.error("Server failed to start - MongoDB not connected:", error.message);
    process.exit(1);
  });
