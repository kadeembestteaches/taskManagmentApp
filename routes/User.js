/*USER ROUTES*/
const express = require('express')
const router = express.Router();

//This takes user to Registration page
router.get("/register",(req,res)=>
{
    res.send("Registration Form");
});

//This takes user to login  page
router.get("/login",(req,res)=>
{
    res.send("Task List Page");
});

//This is executed when the user submits the form
router.post("/user/register",(req,res)=>
{
    res.send("");
});

router.post("/user/login",(req,res)=>
{
    res.send("");
});

module.exports=router;