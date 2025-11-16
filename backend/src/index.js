import express, { urlencoded } from "express";
import mongoose from "mongoose";
import CookieParser from "cookie-parser";

import authRouter from './routes/auth.routes.js';
import taskRouter from './routes/task.routes.js';
import { verifyJWT } from "./middleware/verifyJWT.js";

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(CookieParser())

app.get('/', (req,res) => {
    res.send("Yes this is working")
})

app.use('/api/auth', authRouter);
app.use('/api/task', verifyJWT , taskRouter);


mongoose.connect('mongodb://127.0.0.1:27017/TMS').then(() => {
    app.listen(PORT, () => {
        console.log('http://localhost:'+PORT)
    })
})

