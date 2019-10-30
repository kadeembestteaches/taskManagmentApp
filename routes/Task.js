/*********************Task ROUTES***************************/
const express = require('express')
const router = express.Router();

//Route to direct use to Add Task form
router.get("/add",(req,res)=>
{
    res.render("Task/taskAddForm")
});

//Route to process user's request and data when user submits add task form
router.post("/add",(req,res)=>
{
    res.send("Submitted Add Task Form");
});

////Route to fetch all tasks
router.get("/list",(req,res)=>
{
    res.render("Task/taskdashboard");
});


//Route to direct user to edit task form
router.get("/edit/:id",(req,res)=>
{
    res.send("Edit Task Form");
});

//Route to process user's request and data when user submits edit task form
router.put("/login",(req,res)=>
{
    res.send("Submitted Edit Task form");
});

//Route used to delete task 
router.delete("/delete/:id",(req,res)=>
{
    res.send("Deleted Task");
});



module.exports=router;