const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const { unknownEndpoints, errorHandler } = require("./middleware/error");
const connectDb = require("./config/db");
const app = express();

dotenv.config({ path: "./config/config.env" });

connectDb();

//rouets
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.use(unknownEndpoints);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandle promise rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //close the server
  server.close(() => process.exit(1));
});
