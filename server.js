// Import Express
const express = require('express')
// Create an Express app
const app = express()


// Define routes here:
//landing page
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Mac's multipurpose website server.</h1>
    <p>for a personal greeting, go to <a href="/greetings/yourname">/greetings/yourname</a></p> and replace yourname with your name.
    <p>to roll any size dice, go to <a href="/roll/number">/roll/number</a></p> just fill in how many sides.
    <p>to pull up a collectible item page, go to <a href="/collectible/itemnumber">/collectible/itemnumber</a></p> and replace itemnumber with the number of the item you want to see.
    <p>to reach the shoe store page, go to <a href="/shoes">/shoes</a></p>
    <p>to filter the shoes with a type, minimum price, or maximum price, go to <a href="/shoes?type=type&min=min&max=max">/shoes?type=type&min=min&max=max</a></p>
  `);
});

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
  if (item.istype === 'number') {
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
  console.log(req.query)
  if(!type && !min && !max){
    res.send(`
      <h1>Welcome to Leroy's Bucket O' Shoes, we've got a little bit of everything.</h1>
      <ul>${shoes.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
    }else{
      //if there is a type, min, and max
      if(shoes.includes(type) && min && max){
      //filter the shoes, only send if type matches and price >= min and price <= max
      const shoesList = shoes.filter(shoe => shoe.type === type && shoe.price >= min && shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
      }
    }
    //between max and min
    if(min && max){
      //filter the shoes, only send if price >= min and price <= max
      const shoesList = shoes.filter(shoe => shoe.price >= min && shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
      }
    if(shoes.includes(type)==true&& max){
      //filter the shoes, only send if type matches and price <= max
      const shoesList = shoes.filter(shoe => shoe.type === type && shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
      }
    if(shoes.includes(type)==true&& min > 14){
      //filter the shoes, only send if type matches and price >= min
      const shoesList = shoes.filter(shoe => shoe.type === type && shoe.price >= min);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
    }
//if there is only one query
    if(min < 1000 && !max && !type){
      //filter the shoes, only send if price >= min
      const shoesList = shoes.filter(shoe => shoe.price >= min);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
    } else if(max > 0 && !min && !type){
      //filter the shoes, only send if price <= max
      const shoesList = shoes.filter(shoe => shoe.price <= max);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
    } else if(shoes.contains(type)=true && !min && !max){
      //filter the shoes, only send if type matches
      const shoesList = shoes.filter(shoe => shoe.type === type);
      res.send(`<ul>${shoesList.map(shoe => `<li>${shoe.name} - $${shoe.price}</li>`).join('')}</ul>`)
    } else{
      //if the min is too high, the max is too low, or the type is not found
      //send a 404 error
      if(shoes.includes(type) !=true || min > 1000 || max < 15) {
      res.status(404);
      res.send(`<p>Nah, fam, we don't have anything like that.  Let me call up my boys across town and see if they have any.</p>`);
    }}});




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
//types of shoes
const types = ['sandal', 'sneaker', 'boot', 'heel'];

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})