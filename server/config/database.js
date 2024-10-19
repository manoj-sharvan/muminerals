const mongoose = require('mongoose');

const connectDataBase = async () => {
  mongoose
    .connect(process.env.DB_LOCAL_URL)
    .then((con) => {
      console.log(`MongoDB connected: ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDataBase;
