const express= require("express");
const exphbs = require("express-handlebars");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");


//import your key object
const keys = require("./config/key");



//import your router objects
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Task");
const generalRoutes = require("./routes/General");

//creation of app object
const app = express();

//MAP EXPRESS TO OUR ROUTER OBJECTS
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/task",taskRoutes);

app.use("/",(req,res)=>{
    res.send("404 Error! Page not found");
});




//connects to MongoDB database
mongoose.connect(keys.getMongoDBURL(), {useNewUrlParser: true})
.then(()=>{

    console.log(`You have successfully connected to your mongoDB database`);
})
.catch((err)=>{

    console.log(`Sorry, something occured :${err}`);
})


app.use(bodyParser.urlencoded({extended:false}));

//This tells Express to set Handlebars as template engine
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

//This is used to make load all static resources
app.use(express.static("public"));



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`${keys.MONGO_DB_URL}`);
    console.log(`Your Web Server has been connected`);
});



