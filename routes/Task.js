/*********************Task ROUTES***************************/
const express = require('express')
const router = express.Router();
const Task = require("../models/Task");

//Route to direct use to Add Task form
router.get("/add",(req,res)=>
{
    res.render("Task/taskAddForm")
});

//Route to process user's request and data when user submits add task form
router.post("/add",(req,res)=>
{
    const newTask=
    {
        title:req.body.title,
        description : req.body.description,
        dateReminder:req.body.reminderDate
    }

    const error = [];


    if(newTask.title.trim() =="")
    {
        error.push("Sorry, you must enter a title");
    }

    if(newTask.description.trim() =="")
    {
        error.push("Sorry, you must enter a description");
    }


    if(newTask.dateReminder =="")
    {
        error.push("Sorry, you must enter a reminder date");
    }

    //There are errors
    if(error.length > 0)
    {
        res.render("Task/taskAddForm",{
            messages:error
        });
    }

    //You only want to insert into the database if there are no errors
    else
    {
        const task = new Task(newTask)
        task.save()
        .then(()=>{
            console.log(`Task was added to the database`);
            res.redirect("/task/list");
        
        })
        .catch(err=>console.log(`Error : ${err}`));
    }

  
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