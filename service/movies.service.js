import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function updateMovieById(id, data) {
  return await client.db("backend_connection")
    .collection("mockmovie")
    .updateOne({ id: id }, { $set: data });
    // .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client.db("backend_connection")
    .collection("mockmovie")
    .deleteOne({ id: id});
    // .deleteOne({ _id: new ObjectId(id)});
}
export async function createMovie(data) {
  return await client.db("backend_connection")
    .collection("mockmovie")
    .insertMany(data);
}
export async function getMovieById(id) {
  return await client.db("backend_connection")
    .collection("mockmovie")
    .findOne({ id: id});
    // .findOne({ _id: new ObjectId(id) });
}
export async function getAllMovies(query) {
  if(query.rating){
    query.rating=+query.rating;
  }
  console.log(query);
  return await client.db("backend_connection")
    .collection("mockmovie")
    .find(query).toArray();
}
