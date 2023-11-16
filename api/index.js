const express = require('express');
const cors = require('cors');
// This is really useful when you have a frontend and a backend on separate domains, but they need to work

const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const User = require('./models/User');
const Notes = require('./models/Notes');

const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGOURL);

app.post('/register', async(res,req)=>{
    const {username, password} = req.body;
    const findUser = await User.findOne({username});
    if(!findUser){
        try{
            const userDoc  = await User.create({username, password:bcrypt.hashSync(password,salt)});
            res.json(userDoc);
        }catch(e){
            res.status(400).json('Sorry, not able to register')
        }
    }
});

app.post("/login",async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
         // add jswonwebtoken to store data
       jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        // res.json(token);  token is displayed
        res.cookie('token', token).json(
            // 'ok'
            {
            id:userDoc._id,
            username,  } 
          );                });
        }
        else {
            res.status(400).json('wrong credentials');
          }
    })

// check if user is logged in 
// cokkie has a token and see if token is vaild ie user wahi hai kya joh logged in hai
// each user unique token and uss token se data aayega   so se ki usi token se data aa rha toh logged in
app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

app.post('/notes', (req, res) => {
    const { token } = req.cookies;
    const { notesData } = req.body; // Assuming the frontend sends notes data in the request body
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            res.status(401).json('Unauthorized');
        } else {
            const { content } = req.body;
            const postNotes = await Notes.create({
                title,
                summary,
                content,
                cover: imagePath,
                author: info.id,
              });
        }
    });
});