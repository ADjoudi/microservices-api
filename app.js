const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.URI);
}

const router = require("./routes/index");

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

module.exports = app;
