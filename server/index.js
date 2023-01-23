import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import PostRoutes from "./routes/posts.js";
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "60mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));

app.use(cors());
app.use('/posts', PostRoutes);


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);

