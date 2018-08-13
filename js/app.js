'use strict';

var userVotes = 0;

function Product(fileName) {
  this.fileName = fileName;
  this.numVotes = 0;
  this.timesSeen = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

var item1 = new Product('img/bag.jpg');
var item2 = new Product('img/banana.jpg');
var item3 = new Product('img/bathroom');
new Product('img/boots.jpg');
new Product('img/breakfast.jpg');
new Product('img/bubblegum.jpg');
new Product('img/chair.jpg');
new Product('img/cthulhu.jpg');
new Product('img/dog-duck.jpg');
new Product('img/dragon.jpg');
new Product('img/pen.jpg');
new Product('img/pet-sweep.jpg');
new Product('img/scissors.jpg');
new Product('img/shark.jpg');
new Product('img/sweep.png');
new Product('img/tauntaun.jpg');
new Product('img/unicorn.jpg');
new Product('img/usb.gif');
new Product('img/water-can.jpg');
new Product('img/wine-glass.jpg');

item1.timesSeen++;
item2.timesSeen++;
item3.timesSeen++;

function displayNewProducts() {
  var randIndex1 = Math.floor(Math.random() * Product.allProducts.length);
  var randIndex2 = Math.floor(Math.random() * Product.allProducts.length);
  var randIndex3 = Math.floor(Math.random() * Product.allProducts.length);
  item1 = Product.allProducts[randIndex1];
  while(randIndex1 === randIndex2 && randIndex1 === randIndex3 && randIndex2 === randIndex3) {
    randIndex2 = Math.floor(Math.random() * Product.allProducts.length);
    randIndex3 = Math.floor(Math.random() * Product.allProducts.length);
  }
  item2 = Product.allProducts[randIndex2];
  item3 = Product.allProducts[randIndex3];
  prod1.src = item1.fileName;
  item1.timesSeen++;
  prod2.src = item2.fileName;
  item2.timesSeen++;
  prod3.src = item3.fileName;
  item3.timesSeen++;
}

var prod1 = document.getElementsByTagName('img')[0];
var prod2 = document.getElementsByTagName('img')[1];
var prod3 = document.getElementsByTagName('img')[2];
var radio1 = document.getElementById('vote1');
var radio2 = document.getElementById('vote2');
var radio3 = document.getElementById('vote3');
var vote = document.getElementById('voteButton');

vote.addEventListener('click', function() {
  userVotes++;
  if (radio1.checked) {
    item1.numVotes++;
    radio1.checked=false;
  } else if (radio2.checked) {
    item2.numVotes++;
    radio2.checked=false;
  } else {
    item3.numVotes++;
    radio3.checked=false;
  }
  displayNewProducts();
});
