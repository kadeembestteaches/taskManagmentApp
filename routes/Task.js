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

    
        const task = new Task(newTask)
        task.save()
        .then(()=>{
            console.log(`Task was added to the database`);
            console.log(`${task}`);
            res.redirect("/task/list");
        
        })
        .catch(err=>console.log(`Error : ${err}`));
  
});

////Route to fetch all tasks
router.get("/list",(req,res)=>
{

    Task.find()
    .then((tasks)=>{
        res.render("Task/taskdashboard",
        {
            lists:tasks
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
});


router.get("/profile/:id",(req,res)=>{

    Task.findById(req.params.id)
    .then((task)=>{

        res.render("Task/taskProfile",{
            singleTask:task
        })

    })
    .catch(err=>console.log(`Error : ${err}`));
})


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