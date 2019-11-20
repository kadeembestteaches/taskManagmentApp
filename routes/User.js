/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const bcrypt= require("bcryptjs");
const path = require("path");

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

    const errors= [];

    //Test to see if user did not upload file
    if(req.files==null)
    {
        errors.push("Sorry you must upload a file")
    }   

    //User uploaded file
    else
    {       //file is not an image
            if(req.files.profilePic.mimetype.indexOf("image")==-1)
            {
                errors.push("Sorry you can only upload images : Example (jpg,gif, png) ")
            }
    }


    //Has errors
    if(errors.length > 0)
    {
        res.render("User/register",{
            errors:errors,
            firstName :newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email
        })
    }

    else 
    {

        const user = new User(newUser);
        //create  new user
        user.save()
        .then(user=>{
    
           
            //rename file to include the userid
            req.files.profilePic.name = `db_${user._id}${path.parse(req.files.profilePic.name).ext}`
            
            //upload file to server
            req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
            .then(()=>{

                //Then is needed to refer to associate the uploaded image to the user
                User.findByIdAndUpdate(user._id,{
                    profilePic:req.files.profilePic.name 
                })
                .then(()=>{
                    console.log(`File name was updated in the database`)
                    res.redirect("/user/login");  
                })
                .catch(err=>console.log(`Error :${err}`));
                
                 
            });

        })
        .catch(err=>console.log(`Error :${err}`));

    }

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