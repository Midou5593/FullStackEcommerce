import express from "express";
import productsRouter from "./routes/products/index";

const port = 3000;

const app = express();

//routes
app.get("/", (req, res) => {
  res.send("Hello Worl !");
});

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log("====================================");
  console.log("App listenning on port :", port);
  console.log("====================================");
});
