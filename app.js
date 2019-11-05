const express= require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

//import your router objects
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const generalRoutes = require("./routes/General");

//creation of app object
const app = express();

//This allows your 
app.use(bodyParser.urlencoded({extended:false}));

//This is used to make express load all static resources within the public folder
app.use(express.static("public"));

//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.use("/",(req,res)=>{
    res.render("General/404");
});

//This tells Express to set Handlebars as its template engine
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");


const MONGO_DB_URL =`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-agoxt.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`;
 
//This allows Mongoose to connect to MongoDB
mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true})
.then(()=>{

    console.log(`You have successfully connected to your mongoDB database`);
})
.catch((err)=>{
    console.log(`Sorry, something occured :${err}`);
});



const PORT = process.env.PORT || 3000;

//Creates an Express Web Server that lists for incomin HTTP Requests
app.listen(PORT,()=>{
    console.log(`Your Web Server has been connected`);
    
});



