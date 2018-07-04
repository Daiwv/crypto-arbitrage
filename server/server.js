const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())




app.get('/binance', (req, res) => {
    axios.get("https://api.binance.com/api/v1/exchangeInfo")
  .then(function (response) {
    res.send(response.data)
    // console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

})

app.listen(8080, () => {
    console.log('Listening on port 8080.')
})



