'use strict';

// array of values used to check for repeat images
var checks = [-1, -1, -1];

// votes variable
var userVotes = 0;

// assigning images to variables
var item1 = document.getElementsByTagName('img')[0];
var item2 = document.getElementsByTagName('img')[1];
var item3 = document.getElementsByTagName('img')[2];

// assigning vote counter to variable
var voteCounter = document.getElementById('voteCount');

// placeholder variables for old images
var prod1 = document.getElementsByTagName('img')[0];
var prod2 = document.getElementsByTagName('img')[1];
var prod3 = document.getElementsByTagName('img')[2];

// constructor function for product objects
function Product(fileName, name, votes = 0, shown = 0) {
  this.fileName = fileName;
  this.name = name;
  this.numVotes = votes;
  this.timesSeen = shown;
  Product.allProducts.push(this);
}

// array of all objects
Product.allProducts = [];

// local storage logic and assign retrieved objects to Product
var loadedProduct = JSON.parse(localStorage.getItem('products'));
if(loadedProduct) {
  for(var i = 0; i < loadedProduct.length; i++) {
    new Product(loadedProduct[i].fileName, loadedProduct[i].name, loadedProduct[i].numVotes, loadedProduct[i].timesSeen);
  }
} else {
// object declarations
  new Product('img/bag.jpg', 'R2-D2 bag');
  new Product('img/banana.jpg', 'Banana Slicer');
  new Product('img/bathroom.jpg', 'Bathroom Tablet Stand');
  new Product('img/boots.jpg', 'Toeless Rain Boots');
  new Product('img/breakfast.jpg', 'All in one Breakfast Station');
  new Product('img/bubblegum.jpg', 'Meatball Bubblegum');
  new Product('img/chair.jpg', 'Ergonomically Incorrect Chair');
  new Product('img/cthulhu.jpg', 'Cthulhu Action Figure');
  new Product('img/dog-duck.jpg', 'Dog Duck Lips');
  new Product('img/dragon.jpg', 'Dragon Meat in a Can');
  new Product('img/pen.jpg', 'Pen Cap Utensils');
  new Product('img/pet-sweep.jpg', 'Pet Sweeper');
  new Product('img/scissors.jpg', 'Pizza Scissor');
  new Product('img/shark.jpg', 'Shark Sleeping Bag');
  new Product('img/sweep.png', 'Baby Sweeper');
  new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
  new Product('img/unicorn.jpg', 'Unicorn Meat in a Can');
  new Product('img/usb.gif', 'Wiggling USB Tentacle');
  new Product('img/water-can.jpg', 'Self-Watering Water Can');
  new Product('img/wine-glass.jpg', 'Egg Wine Glass');
}

// creates chart after user voting process complete
function getResults() {
  var namesArray = [];
  var votesArray = [];
  var seenArray = [];
  for(var i = 0; i < Product.allProducts.length; i++) {
    namesArray.push(Product.allProducts[i].name);
    votesArray.push(Product.allProducts[i].numVotes);
    seenArray.push(Product.allProducts[i].timesSeen);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        backgroundColor: 'lightblue',
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1
      },
      {
        label: 'Times Seen',
        data: seenArray,
        backgroundColor: 'ivory',
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'black'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            fontColor: 'black'
          },
        }],
        xAxes: [{
          ticks: {
            autoSkip: false,
            fontColor: 'black',
            suggestedMax: 7,
          },
        }]
      }
    }
  });
}

// generates random numbers
function randomNumber() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

// displays 3 new images that are unique and unrepeated from previous round
function displayNewProducts() {
  if(userVotes >= 25) {
    getResults();
    prod1.remove();
    prod2.remove();
    prod3.remove();
    voteCounter.remove();
    localStorage.setItem('products', JSON.stringify(Product.allProducts));
  } else {
    var randIndex1 = randomNumber();
    var randIndex2 = randomNumber();
    var randIndex3 = randomNumber();
    while(checks.includes(randIndex1)) {
      randIndex1 = randomNumber();
    }
    while(randIndex1 === randIndex2 || checks.includes(randIndex2)) {
      randIndex2 = randomNumber();
    }
    while(randIndex1 === randIndex3 || randIndex2 === randIndex3 || checks.includes(randIndex3)) {
      randIndex3 = randomNumber();
    }
    checks[0] = randIndex1;
    checks[1] = randIndex2;
    checks[2] = randIndex3;
    item1 = Product.allProducts[randIndex1];
    item2 = Product.allProducts[randIndex2];
    item3 = Product.allProducts[randIndex3];
    prod1.src = item1.fileName;
    item1.timesSeen++;
    prod2.src = item2.fileName;
    item2.timesSeen++;
    prod3.src = item3.fileName;
    item3.timesSeen++;
  }
}

// event listener for first image
item1.addEventListener('click', function() {
  item1.numVotes++;
  userVotes++;
  voteCounter.textContent = `${userVotes}/25 Votes`;
  displayNewProducts();
});

// event listener for second image
item2.addEventListener('click', function() {
  item2.numVotes++;
  userVotes++;
  voteCounter.textContent = `${userVotes}/25 Votes`;
  displayNewProducts();
});

// event listener for third image
item3.addEventListener('click', function() {
  item3.numVotes++;
  userVotes++;
  voteCounter.textContent = `${userVotes}/25 Votes`;
  displayNewProducts();
});

// display first images on the page as random
displayNewProducts();
