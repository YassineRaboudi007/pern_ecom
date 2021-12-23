const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./routes/products");
const userRouter = require("./routes/users");
const { handleError } = require("./helpers/ErrorHandler");
//body middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static("./public"));
app.use("/products", productRouter);
app.use("/users", userRouter);

//cors for tranfer of data between front and back
app.use(handleError);

app.listen(5000, () => {
  console.log("server running", `${__dirname}/../frontend/client`);
});
