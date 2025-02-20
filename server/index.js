import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.send("Hello World")
})

app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`)
})