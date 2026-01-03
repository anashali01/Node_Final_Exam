import express from 'express'
import dotenv from './config/dotenv.js';
import bodyParser from 'body-parser';
import router from './routers/index.js';
import db from "./config/db.js";
import cookieParser from 'cookie-parser';
const app = express()

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/',router)
let port = dotenv.PORT || 3000;

app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server Started On : http://localhost:${port}`);
    
})