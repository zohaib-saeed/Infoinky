// imports
const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/user");
//dotnev config
dotenv.config({ path: "./config.env" });

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());

//Connection to DB
const DB = process.env.MONGO_URL.replace(
  "<username>",
  process.env.MONGO_USER
).replace("<password>", process.env.MONGO_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((error) => {
    console.log("Failed to connect" + error);
  });

// Using the express router for specific paths
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

// Listening to the port
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
