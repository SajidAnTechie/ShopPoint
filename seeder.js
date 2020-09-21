const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env vars
dotenv.config({ path: "./config/config.env" });

//load models
const User = require("./models/User");
const Product = require("./models/Product");

// Connect to DB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/product.json`, "utf-8")
);

//Import into DB

const importData = async () => {
  try {
    await User.create(users);
    await Product.create(products);
    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data Destroy".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
