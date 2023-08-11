const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);


let ip = require("ip");
console.log(ip.address());