/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();

//This allows you to pefrom CRUD operations on the User colections 
const User = require("../models/User");

//Route to direct use to Registration form
router.get("/register",(req,res)=>
{
    res.render("User/register");
});

//Route to process user's request and data when user submits registration form
router.post("/register",(req,res)=>
{


    //validation

    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName ,
        email : req.body.email,
        password : req.body.password
    }


    const user = new User(newUser)

    user.save()
    .then(user=>{

        //bcrypt code here
        res.redirect("/user/login");
    })
    .catch(err=>console.log(`Error :${err}`));

});


//Route to direct user to login form
router.get("/login",(req,res)=>
{
    res.render("User/login");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{
    res.send("Submitted Login form");
});

//Route used to pull user's profile 
router.get("/profile",(req,res)=>
{
    res.send("User/userDashboard");
});

////Route to process user's request and data when user submits edit form
router.put("/profile",(req,res)=>
{
    res.send("Upatted user's profile page");
});

module.exports=router;