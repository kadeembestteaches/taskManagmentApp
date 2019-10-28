
const express = require('express')
const router = express.Router();

/*TASK ROUTES*/
//This takes user to home page
router.get("/task/add",(req,res)=>
{
    res.send("Add Task Page Page");
});

//This takes user to about page
router.get("/task/list",(req,res)=>
{
    res.send("Task List Page");
});

//This is executed when the user submits the form
router.post("/task/add",(req,res)=>
{
    res.send("");
});

//This is used to direct the user to the edit form page
router.get("/task/edit/:id",(req,res)=>
{
    res.send("Edit Form");
});

//This is executed when the user hits the update button
router.put("/task/edit/:id",(req,res)=>
{
    res.send("Task List Page");
});


module.exports=router;
