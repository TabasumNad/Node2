import * as dotenv from "dotenv";
dotenv.config();
// const express = require("express");//3rd  party package
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import moviesRouter from "./router/movies.router.js";
import usersRouter from "./router/users.router.js"
// import loginRouter from "./router/login.router.js";




const app = express();

// const PORT = 4000;
const PORT=process.env.PORT;
console.log(process.env.MONGO_URL);

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL=process.env.MONGO_URL;



export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");



app.use(cors());
// Intercede --> middleware -->converting body to json
app.use( express.json());


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
  

app.use('/movies',moviesRouter);
app.use('/users',usersRouter);
// app.use('/login',loginRouter);

// DemoApp for FSD day 1--->creating API for mobile
// app.use('/mobile',mobileRouter);
const mobiles=[
  {
    "model": "OnePlus 9 5G",
    "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    "company": "Oneplus"
  },
  {
    "model": "Iphone 13 mini",
    "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    "company": "Apple"
  },
  {
    "model": "Samsung s21 ultra",
    "img": "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    "company": "Samsung"
  },
  {
    "model": "Xiomi mi 11",
    "img": "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    "company": "Xiomi"
  }
]

app.get("/mobile", async function (request, response) {

  const result= await client.
  db("backend_connection")
  .collection("mobiles")
  .find({})
  .toArray();
  
  response.send(mobiles);
});

app.post("/mobile", async function (request, response) {

  const data=request.body;
    console.log(data);

    const result= await client.
    db("backend_connection")
    .collection("mobiles")
    .insertMany(data);
  response.send(result);
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


