require("dotenv").config();
// async errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const { router } = require("./routes/products");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes

app.use("/api/v1/products", router);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, function () {
      console.log(`Server started on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
