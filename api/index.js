const express = require('express');
const { API_KEY } = require('../config');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const verifyToken = require('../middlewares/jwt')
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const User = db.User;
const FavoriteMovies = db.FavoriteMovies;

const generatePassword = (length) => {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return password;
  };

router.get('/movies',verifyToken,(req,res)=>{
    res.sendStatus(403);
})

router.get('/movies/favorite',(req,res)=>{
    let where = { id: req.params.id };
    FavoriteMovies.findOne({
        where,
        raw: true,
    })
    .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(403).send({ message: "Terjadi error di server" });
      });
})

router.post('/movies/favorite',(req,res)=>{
    const data = req.body
    console.log(data);

    if (!req.body.user_id) {
        res.status(403).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
     const favorite_movies = {
        id: req.body.id,
        title : req.body.title,
        user_id: req.body.user_id,
      };
    
      FavoriteMovies.create(favorite_movies)
        .then(datas => {
          res.send(datas);
        })
        .catch(err => {
          res.status(403).send({
            message: err.message || "Some error occurred while creating the User."
          });
        });
})

router.get('/movies/:movie_title',(req,res)=>{
    let titles = req.params.movie_title;
    axios.get(`http://www.omdbapi.com/?s=${titles}&apikey=${API_KEY}`)
    .then((response)=>{
        arrPoster = []
        response.data.Search.forEach(el => {
            arrPoster.push(el['Poster'])
        })
        console.log(arrPoster)
        res.send(JSON.stringify(arrPoster))
    })
})



router.post('/api/login', async(req,res)=>{
    const user = {
        user_id: 5,
        name:'example@gmail.com',
        password:'123'
    }
    //$2b$10$Ohxkt2rmHcQyUcS43Bh1KO02V7EeZk4sxc4SgwyGQfw5.GiZz4psO
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjUsIm5hbWUiOiJleGFtcGxlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIn0sImlhdCI6MTYyMjM0OTcwM30.X9EN0XXZvUrInTEQpBpT4Tuu9sN_8RwzwS8ycpZtU5o
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(user.password)
    User.create(user)
    .then(datas => {
        res.send(datas);
    })
    .catch(err => {
        res.status(403).send({
        message: err.message || "Some error occurred while creating the User."
        });
    });
})

router.get('/api/profile',verifyToken,async(req,res)=>{
    const body = req.body;
    const user = await User.findOne({ user_id: body.user_id });
    if (user) {
    jwt.verify(req.token,'secretkey',async(err,authData)=>{
        const validPassword = await bcrypt.compare(authData.password, user.password);
        if(err)
            res.sendStatus(403);
        else{
            if(validPassword)  {
                res.json({
                    message:"Welcome to Profile",
                    userData:authData
                })
            }    
        }
    })
    }
});

module.exports = router;