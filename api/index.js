const express = require('express');
const { API_KEY } = require('../config');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/jwt')
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const User = db.User;
const FavoriteMovies = db.FavoriteMovies;

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
        console.log("TES")
        res.send(response.data)
    })
})



router.post('/api/login',(req,res)=>{
    const user = {
        id:Date.now(),
        userEmail:'example@gmail.com',
        password:'123'
    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
})

router.get('/api/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err)
            res.sendStatus(403);
        else{
            res.json({
                message:"Welcome to Profile",
                userData:authData
            })
        }
    })
});

module.exports = router;