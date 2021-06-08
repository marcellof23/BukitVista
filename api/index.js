const express = require('express');
const { API_KEY } = require('../config');
const { logger } = require('../logger');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
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

router.get('/movies/favorite',verifyToken,(req,res)=>{
    jwt.verify(req.token,"secretkey",(err,authData)=>{
        
        if(err) {
            res.sendStatus(403);
        }
        else{
            let where = { user_id: authData.user_id };
            logger.info({ where }, 'Fetch users favorite movie from DB');
            FavoriteMovies.findAll({
                where,
                raw: true,
            })
            .then((data) => {   
                res.send(data);
            })
            .catch((err) => {
                console.log(err);
                return res.status(403).send({ message: "Terjadi error di server" });
            });
        }
    })
    
})

router.post('/movies/favorite',verifyToken,(req,res)=>{
    const data = req.body

    if (!req.body.user_id) {
        res.status(403).send({
          message: "Content can not be empty!"
        });
        return;
    }
    const users = req.body.user_id;
    logger.info({ users }, 'Post users favorite movie to DB');
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

router.get('/movies/:movie_title',verifyToken,(req,res)=>{
    let titles = req.params.movie_title;
    logger.info({ titles }, 'Fetch movie by title');
    axios.get(`http://www.omdbapi.com/?s=${titles}&apikey=${API_KEY}`)
    .then((response)=>{
        arrPoster = []
        response.data.Search.forEach(el => {
            arrPoster.push(el['Poster'])
        })
        res.send(JSON.stringify(arrPoster))
    })
})



router.post('/api/regist', async(req,res)=>{
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const users = {
            user_id: req.body.user_id,
            name: req.body.name,
            password: hash
        };
        User.create(users)
        .then(datas => {
            res.send(datas);
        })
        .catch(err => {
            res.status(403).send({
            message: err.message || "Some error occurred while creating the User."
            });
        });
    });
})

router.post('/api/signin',(req,res)=>{
    let getUser;
    let where = { user_id: req.body.user_id };
    User.findOne({
        where,
        raw: true,
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then((response) => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            user_id: getUser.user_id,
            name: getUser.name
        }, "secretkey", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(403).send({ message: "Terjadi error di server" });
      });
})

router.post('/api/profile',verifyToken,async(req,res)=>{
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