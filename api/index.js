const express = require('express');
const { API_KEY } = require('../config');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/jwt')
const router = express.Router();
const axios = require('axios');
const db = require('../models');
const User = db.User;

router.get('/movies',verifyToken,(req,res)=>{
    res.sendStatus(403);
})

router.get('/movies/favorite',(req,res)=>{
    
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=star+wars`)
    .then((response)=>{
        console.log("TES")
        res.send(response.data.Search[0]["Poster"])
    })
})

router.post('/movies/favorite',(req,res)=>{
    const data = req.body
    console.log(data);

    if (!req.body.user_id) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
     const user = {
        user_id: req.body.user_id,
        name: req.body.name,
        password: req.body.password,
      };
    
      User.create(user)
        .then(datas => {
          res.send(datas);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
        });
})

router.get('/movies/:movie_title',(req,res)=>{
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