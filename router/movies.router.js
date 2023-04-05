import express from "express";
import { getAllMovies, getMovieById, createMovie, deleteMovieById, updateMovieById } from "../service/movies.service.js";
import { auth } from "../middleware/auth.js";
const router=express.Router();

// TO GET ALL MOVIES 
router.get("/", auth, async function (request, response) {

  console.log(request.query);
    const movies=await getAllMovies(request.query);
                //  console.log(movies);
                    response.send(movies);
    
  });


// TO GET MOVIE BY ID
  router.get("/:id", auth, async function (request, response) {
    // console.log(request.params);
    const {id}=request.params;
    // const movie=movies.filter((mv)=> mv.id===id);
    
    // const movie=movies.find((mv)=> mv.id===id);


    //to get particular movie info from mongodb

    const movie =await getMovieById(id);

    console.log(movie);
    movie ? response.send(movie):
    response.status(404).send({message:"No Match Found"});
  });
  




  // to create or to POST data
//express.json()-->inbuilt middleware-->comes exactly betweeen the path and callback
  router.post("/", async function (request, response) {
    const data=request.body;
    console.log(data);
    //to create data in database -->db.mockmovie.insertmany(data)
    const result =await createMovie(data);

    response.send(result);
     
   });





   // TO DELETE MOVIE BY ID
  router.delete("/:id", async function (request, response) {
    // console.log(request.params);
    const {id}=request.params;
    // const movie=movies.filter((mv)=> mv.id===id);
    
    // const movie=movies.find((mv)=> mv.id===id);


    //to get particular movie info from mongodb

    const result =await deleteMovieById(id);

    console.log(result);
    result.deletedCount >=1 ? response.send({message:"MOVIE WAS DELETED SUCCESSFULLy"}):
    response.status(404).send({message:"No Match Found"});
  });




   // TO UPDATE MOVIE BY ID
   router.put("/movies/:id", async function (request, response) {
    // console.log(request.params);
    const {id}=request.params;
    const data=request.body;
    console.log(data);
    
    const result =await updateMovieById(id, data);

    
    response.send(result);
  });

export default router;




