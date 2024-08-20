require("dotenv").config();
const app = require("./app");
const mongodbConnection = require("./db/config");
mongodbConnection();
app.listen(process.env.PORT || 3000, () => {
  console.log(`server run on ${process.env.PORT || "3000"}`);
});
