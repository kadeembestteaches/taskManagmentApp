const express = require('express')
const router = express.Router();

/*GENERAL ROUTES*/

//This takes user to home page
router.get("/",(req,res)=>
{
    res.send("Home Page");
});

//This takes user to about page
router.get("/about",(req,res)=>
{
    res.send("About Page");
});

module.exports=router;