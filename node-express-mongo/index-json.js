const express=require('express');
const bodyParser = require('body-parser');
const path=require('path');

const app = express();

/*
const logger = function(req, res, next){
	console.log('Logging');
	next();
};

app.use(logger);

*/

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));


const people=[
  {
    name: 'Jeff',
    age: 30
  },
  {
    name: 'Jef2',
    age: 40
  },
  {
    name: '3eff',
    age: 35
  }
];

app.get('/', function(req, res){
//  res.send('Hello wrold');
    res.json(people);
});

app.listen(3000, function(){
	console.log('Server on 3000');
});
