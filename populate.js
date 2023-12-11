// dynamically add all values in database from products.json
// can also bew done manually with a POST route
require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log("Error adding products from json file.");
    process.exit(1);
  }
};

start();
