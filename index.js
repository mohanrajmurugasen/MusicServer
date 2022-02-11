require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const AdminRegisterRoutes = require("./routes/AdminRegisterRoutes");
const UploadRoutes = require("./routes/UploadRoutes");

const PORT = process.env.PORT || 4001;

app.use((req, res, next) => {
  console.log("Our middleware");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", AdminRegisterRoutes);
app.use("/", UploadRoutes);

app.use("/images", express.static("./images"));

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server starts on ${PORT}`);
  });
});
