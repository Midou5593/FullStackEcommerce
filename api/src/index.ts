import express,{json,urlencoded} from "express";
import productsRouter from "./routes/products/index";

const port = 3000;

const app = express();


app.use(urlencoded({extended:false}));
app.use(json());
//routes


app.use("/products", productsRouter);

app.listen(port, () => {
  console.log("====================================");
  console.log("App listenning on port :", port);
  console.log("====================================");
});
