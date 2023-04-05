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


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


