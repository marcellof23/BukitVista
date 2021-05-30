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

router.get('/movies/favorite',verifyToken,(req,res)=>{
    console.log(verifyToken.user_id)
    console.log("TESSSSSSSSSSSS")
    let where = { user_id: req.params.user_id };
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

router.post('/movies/favorite',verifyToken,(req,res)=>{
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

router.get('/movies/:movie_title',verifyToken,(req,res)=>{
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



router.post('/api/regist', async(req,res)=>{
    //$2b$10$lIR5a1MwjLT2JZQMoU0gl.agYff0wQkB8sf6EZHIQlWNNP/ZTzFO2
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjUsIm5hbWUiOiJleGFtcGxlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIn0sImlhdCI6MTYyMjM0OTcwM30.X9EN0XXZvUrInTEQpBpT4Tuu9sN_8RwzwS8ycpZtU5o
    // token baru : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjUsIm5hbWUiOiJleGFtcGxlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIn0sImlhdCI6MTYyMjM1NzY4N30.dPpwGffErjl3Fthl1Udjqz-HODfEMvk2_1AQb0NbxeM
    
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const users = {
            user_id: req.body.user_id,
            name: req.body.name,
            password: hash
        };
        console.log(hash)
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
            console.log(user)
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        if(bcrypt.compare(req.body.password, user.password)) {
            console.log("berhasillllllllllllll")
        }
        return bcrypt.compare(req.body.password, user.password);
    }).then((response) => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            user_id: getUser.email,
            name: getUser.name
        }, "secretkey", {
            expiresIn: "1h"
        });
        console.log("INI TOKENNYA WOIIII")
        console.log(jwtToken)
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
        console.log(authData.password)
        console.log(user.password)
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