/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();

//Route to direct use to Registration form
router.get("/register",(req,res)=>
{
    res.send("Registration Form");
});

//Route to process user's request and data when user submits registration form
router.post("/register",(req,res)=>
{
    res.send("Submitted Registration Form");
});


//Route to direct user to login form
router.get("/login",(req,res)=>
{
    res.send("Login Form");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{
    res.send("Submitted Login form");
});

//Route used to pull user's profile 
router.get("/profile",(req,res)=>
{
    res.send("User profile page");
});

////Route to process user's request and data when user submits edit form
router.put("/profile",(req,res)=>
{
    res.send("Upatted user's profile page");
});




module.exports=router;