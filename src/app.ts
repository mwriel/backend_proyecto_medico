import express  from "express";

const app = express();
const port = 3050;

app.get('/', (req,res) =>{
    res.send('hola mundo');
});

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
});