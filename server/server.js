const app = require("./app");
const dotEnv = require("dotenv");
const path = require("path");
const connectDataBase = require("./config/database");

dotEnv.config({ path: path.join(__dirname, "./config/config.env") });

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

connectDataBase();
