const { API_KEY } = require('../config');
const axios = require('axios');


const getMovies = async () => {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=star+wars`)
  .then((response)=>{
      console.log(response.data)
      res.send(response.data)
  })
};

getMovies();