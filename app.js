const express= require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/key");

//import your router objects
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const generalRoutes = require("./routes/General");

//creation of app object
const app = express();

//Most be above your routes
app.use(bodyParser.urlencoded({extended:false}));

//This is used to make load all static resources
app.use(express.static("public"));

//MAP EXPRESS TO OUR ROUTER OBJECTS
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.use("/",(req,res)=>{
    res.render("General/404");
});

//This tells Express to set Handlebars as template engine
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");



//connect to mongoDB using mongoose
mongoose.connect(keys.getMongoDBURL(), {useNewUrlParser: true})
.then(()=>{

    console.log(`You have successfully connected to your mongoDB database`);
})
.catch((err)=>{
    console.log(`Sorry, something occured :${err}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Your Web Server has been connected`);
    
});



