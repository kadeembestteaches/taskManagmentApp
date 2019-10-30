const express= require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");



//import your router objects
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const generalRoutes = require("./routes/General");

//creation of app object
const app = express();

//Most be above your routes
app.use(bodyParser.urlencoded({extended:false}));

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

//This is used to make load all static resources
app.use(express.static("public"));


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Your Web Server has been connected`);
    
});



