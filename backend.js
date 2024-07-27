import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
dotenv.config();
const api=process.env.API_URL;

app=express();
app.get (api +'/', (req, res) => {
    res.send('Hello World');
});
app.listen(3000, () => {
    console.log(api);    
    console.log('server is running http://localhost:3000');
});