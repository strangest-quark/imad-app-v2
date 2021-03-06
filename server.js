var express = require('express');
var morgan = require('morgan');
var path = require('path');

var http = require('http');
var Pool = require('pg').Pool;

var config = {
  host: 'db.imad.hasura-app.io',
  port: '5432',
  user: 'strangest-quark',
  password: 'db-strangest-quark-50233',
  database: 'strangest-quark',
};

var pool = new Pool(config);

app.get('/test-db', function (req, res) 
{
   pool.query('SELECT * FROM TEST',function(err,result) 
   {
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows()));
      }
       
   });
});


var app = express();
app.use(morgan('combined'));

var page= `<!doctype html>
           <h1> hi </h1>`;
var counter=0;
app.get('/counter', function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/page', function (req, res) {
  res.send(page);
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
