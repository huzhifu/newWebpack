var longVariableName = 'Hello1';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');

var $ = require('jquery');
$('h1').text('哈哈');

require("./es6.js");
require('../app.css');

var img1 = document.createElement("img");
img1.src = require("../img/small.png");
document.body.appendChild(img1);

var img2 = document.createElement("img");
img2.src = require("../img/big.png");
document.body.appendChild(img2);
