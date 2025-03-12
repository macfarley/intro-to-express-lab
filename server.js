// Import Express
const express = require('express')
// Create an Express app
const app = express()
// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})


// Define routes here:
//For a personal greeting
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<h1>Good Morning, ${username}!</h1>`);
});


//To roll any size of dice
app.get('/roll/:number', (req, res) => {
  res.send(`<h1>You rolled a ${Math.floor(Math.random()*(req.params.number))}.</h1>`);
});


//to pull up an item page
app.get('/collectible/:itemNumber', (req, res) => {
  const itemNumber = req.params.itemNumber;
  const item = collectibles[itemNumber];
  if (item) {
    const formattedPrice = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(item.price);
    res.send(`
      <script>console.log(${JSON.stringify(item)});</script>
      <h1>So you like the look of the ${item.name}, a keen eye indeed.  It's our last one, that will be ${formattedPrice}</h1>
    `);
  } else {
    res.send("<h1>I've never heard of such an illegal item.  There's no such item here, officer.</h1>");
  }
});


//to pull up all shoes page
//put bullet points for each shoe
app.get('/shoes', (req, res) => {
  const type = req.query.type;
  const min = req.query.min;
  const max = req.query.max;
  const formattedPrice = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(shoes.price);
  console.log(req.query)
  if(!type && !min && !max){
    res.send(`
      <h1>Welcome to Leroy's Bucket O' Shoes, we've got a little bit of everything.</h1>
      <ul>${shoes.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
  }else{
    //if there is a type, min, and max
    if(type && min && max){
      //filter the shoes, only send if type matches and price >= min and price <= max
      const shoesList = shoes.filter(shoe => shoe.type === type && shoe.price >= min && shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    }
    //between max and min
    if(min && max){
      //filter the shoes, only send if price >= min and price <= max
      const shoesList = shoes.filter(shoe => shoe.price >= min && shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    } else if(type&&max){
      //filter the shoes, only send if type matches and price <= max
      const shoesList = shoes.filter(shoe => shoe.type === type && shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    } else if(type&&min){
      //filter the shoes, only send if type matches and price >= min
      const shoesList = shoes.filter(shoe => shoe.type === type && shoe.price >= min);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    }
    //if there is only one query
    else if(min){
      //filter the shoes, only send if price >= min
      const shoesList = shoes.filter(shoe => shoe.price >= min);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    } else if(max){
      //filter the shoes, only send if price <= max
      const shoesList = shoes.filter(shoe => shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    } else if(type){
      //filter the shoes, only send if type matches
      const shoesList = shoes.filter(shoe => shoe.type === type);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - ${shoe.price}</li>`).join('')}</ul>`)
    } else{return}
    }
  
});




//Data Arrays
//for Collectibles
const collectibles = [
  { name: 'shiny ball', price: 355.95 },
  { name: 'autographed picture of a dog', price: 1375 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 120.99 }
];
//for shoes
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
