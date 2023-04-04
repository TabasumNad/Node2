import * as dotenv from "dotenv";
dotenv.config();
// const express = require("express");//3rd  party package
import express from "express";
import { MongoClient } from "mongodb";
const app = express();

// const PORT = 4000;
const PORT=process.env.PORT;
console.log(process.env.MONGO_URL);

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL=process.env.MONGO_URL;



const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");


// Intercede --> middleware -->converting body to json
app.use( express.json());


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});
  

// TO GET ALL MOVIE 
app.get("/movies", async function (request, response) {
    const movies=await client.db("backend_connection")
                 .collection("mockmovie")
                 .find({}).toArray();
                 console.log(movies);
                    response.send(movies);
    
  });


// TO GET MOVIE BY ID
  app.get("/movies/:id", async function (request, response) {
    // console.log(request.params);
    const {id}=request.params;
    // const movie=movies.filter((mv)=> mv.id===id);
    
    // const movie=movies.find((mv)=> mv.id===id);


    //to get particular movie info from mongodb

    const movie =await client.db("backend_connection")
                 .collection("mockmovie")
                 .findOne({id:id});

    console.log(movie);
    movie ? response.send(movie):
    response.status(404).send({message:"No Match Found"});
  });
  




  // to create or to POST data
//express.json()-->inbuilt middleware-->comes exactly betweeen the path and callback
  app.post("/movies", async function (request, response) {
    const data=request.body;
    console.log(data);
    //to create data in database -->db.mockmovie.insertmany(data)
    const result =await client.db("backend_connection")
                 .collection("mockmovie")
                 .insertMany(data);

    response.send(result);
     
   });





   // TO DELETE MOVIE BY ID
  app.delete("/movies/:id", async function (request, response) {
    // console.log(request.params);
    const {id}=request.params;
    // const movie=movies.filter((mv)=> mv.id===id);
    
    // const movie=movies.find((mv)=> mv.id===id);


    //to get particular movie info from mongodb

    const result =await client.db("backend_connection")
                 .collection("mockmovie")
                 .deleteOne({id:id});

    console.log(result);
    result.deletedCount >=1 ? response.send({message:"MOVIE WAS DELETED SUCCESSFULLy"}):
    response.status(404).send({message:"No Match Found"});
  });




   // TO UPDATE MOVIE BY ID
   app.put("/movies/:id", async function (request, response) {
    // console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    console.log(data);
    
    const result =await client.db("backend_connection")
                 .collection("mockmovie")
                 .updateOne({id:id},{$set:data});

    
    response.send(result);
  });




app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
