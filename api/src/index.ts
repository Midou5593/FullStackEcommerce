import express from "express";

const port = 3000;

const app = express();

//routes
app.get("/", (req, res) => {
  res.send("Hello Worl !");
});

app.listen(port, () => {
  console.log("====================================");
  console.log('App listenning on port :',port);
  console.log("====================================");
});
