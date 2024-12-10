import express from "express";
import bcrypt, { compare } from "bcrypt";

const app = express();

// const saltRounds =10; //salt mean random string
const hashPassword = async(password)=>{
  try{
    const hash = await bcrypt.hash(password,10);
    console.log("hashed password:",hash);
  }catch(err){
    console.log("Error Hashing password",err);
  }
}

const inputPassword = "kaleem123";
const hashedPassword = "$2b$10$h9NJKKIxFkCFReOeJh32kOBLqecxiLcB5ooRkS.9kUo/xKzOjbwE6"; 

const checkPassword = async(inputPassword,hashedPassword)=>{
  try{
    const isMatch = await compare(inputPassword,hashedPassword);
    if(isMatch){
      console.log("password Mached");
    }else{
      console.log("password Not Matched");
    }
  }catch(err){
    console.log("error password matching :",err);
  }
}

// hashPassword("kaleem123");
checkPassword("kaleem123",hashedPassword);

app.get("/",async(req,res)=>{
  const matchResult = await compare(inputPassword,hashedPassword);
  res.send(`
      <h1>Password and Matching Password</h1>
      <h3>Input Password:</h3><p>${inputPassword}</p>
      <h3>Hashed Password:</h3><p>${hashedPassword}</p>
      <h3>Match Password:</h3><p>${matchResult}</p>
    `)
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
