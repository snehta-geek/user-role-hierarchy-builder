import mongoose from "mongoose";
import express from "express";
import userRoute from "./Routes/userRoutes.js";
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();


const app = express();

/* Create a connection & new DB in mongooose */
mongoose.connect("mongodb://localhost:27017/userRoleDB",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Database is Connected successfully...!!!"))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',userRoute); 


const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log("Server Started......"))