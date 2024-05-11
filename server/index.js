const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log("error message:", e);
  }
})();
