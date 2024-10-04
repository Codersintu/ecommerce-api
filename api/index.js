const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./router/auth");
const userRoute=require("./router/user");
const ProductRoute=require("./router/product")
const OrderRoute=require("./router/order")
const CartRoute=require("./router/cart")

dotenv.config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use("/api/users",userRoute);
  app.use("/api/product",ProductRoute)
  app.use("/api/order",OrderRoute)
  app.use("./api/cart",CartRoute)


  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });