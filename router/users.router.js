import express from "express";
import { createUser, getUserByName } from "../service/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router=express.Router();




async function generateHashedpassword(password){
  const NO_OF_ROUND=10;
  const salt=await bcrypt.genSalt(NO_OF_ROUND);
  const hashedpassword=await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedpassword);
  return(hashedpassword);

}

 
  router.post("/signup", async function (request, response) {
    const { username, password}=request.body;
    // console.log(data);
  
    const userFromDB= await getUserByName(username);
    console.log(userFromDB);

    if(userFromDB){
      response.status(400).send({message:"Username already exists"});
    }
    else if(password.length<8){
      response.status(400).send({message:"Password must be atleast 8 character"});

    }else{
      const hashedpassword = await generateHashedpassword(password);
    const result = await createUser({
      username:username,
      password:hashedpassword,

    });

    response.send(result);
    }
    }  
   );





// LOGIN 

   router.post("/login", async function (request, response) {
    const { username, password}=request.body;
    // console.log(data);
  
    const userFromDB= await getUserByName(username);
    console.log(userFromDB);

    if(!userFromDB){
      response.status(400).send({message:"INVALID CREDENTIAL"});
    }
    else{
      const storeDBPassword = userFromDB.password;
      const isPasswordCheck = await bcrypt.compare(password, storeDBPassword);
      console.log(isPasswordCheck)

      if(isPasswordCheck){

        const token= jwt.sign({id:userFromDB._id}, process.env.SECRET_KEY);
        response.send({message:"SUCCESSFULL LOGIN", token:token})
      }
      else{
        response.status(401).send({message:"INVALID CREDENTIAL"});
      }
    }
  });



 

export default router;




