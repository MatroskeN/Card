import Post from './Post.js';
import express from 'express';
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'

const DB_URL = `mongodb+srv://user:user@cluster0.lidch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express();
// app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json())

app.post('/', async (req,res) => {
    try{
        const {number, expiration, cvv, amount} = req.body
        const post = await Post.create({number, expiration, cvv, amount})
        const resData = {
            id:post._id,
            amount:post.amount
        }
        res.json(resData)
        console.log(resData)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})

const port = process.env.PORT || 8080;

async function startApp() {
    try{
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(port,()=>{
            console.log('We are live on', port)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()

