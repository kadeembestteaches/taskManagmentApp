const express = require('express')
const router = express.Router();

/*GENERAL ROUTES*/

//Route to direct user to home page
router.get("/",(req,res)=>
{
    res.send("Home Page");
});


//Route to direct user to about us page
router.get("/about",(req,res)=>
{
    res.send("About Page");
});

module.exports=router;