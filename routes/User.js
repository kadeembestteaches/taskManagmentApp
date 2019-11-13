/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const bcrypt= require("bcryptjs");

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

    const errors= [];
    const formData = {
        email : req.body.email,
        password : req.body.password
    }

    User.findOne({email:formData.email})
    .then(user=>{

        //This means that there was no matching email in the database
        if(user==null)
        {
            errors.push("Sorry your email was not found");
            res.render("User/login",{
                errors: errors
            })
        }

        //This reprsents tha the email exists
        else
        {
            bcrypt.compare(formData.password,user.password)
            .then(isMatched=>{

                if(isMatched==true)
                {
                    //It means that the user is authenticated 

                    //Create session 
                    req.session.userInfo=user;
                    res.redirect("/user/profile")
                }

                else
                {
                    errors.push("Sorry, your password does not match");
                    res.render("User/login",{
                        errors:errors
                    })
                }

            })

            .catch(err=>console.log(`Error :${err}`));
        }
    })
    .catch(err=> console.log(`Something occured ${err}`));



});


router.get("/logout",(req,res)=>{

    //This destorys the session
    req.session.destroy();
    res.redirect("/user/login");

});

//Route the user to their dashboard 
router.get("/profile",(req,res)=>
{
    res.render("User/userDashboard");
});


module.exports=router;