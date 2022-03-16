const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  const data = {
    body:`<img src='images/beer.png'>
          <a href='/beers'>Check the beers!</a>
          <a href='/random-beer'>Check a random beer</a>`
  }

  res.render('index',data);
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI)
    res.render('randombeer',{responseFromAPI})
  })
  .catch(error => console.log(error));
});

app.get('/beers', (req, res) => {
  
  punkAPI.getBeers()
  .then(beersFromApi => 
    res.render('beers',{beersFromApi}))
  .catch(error => console.log(error))

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
