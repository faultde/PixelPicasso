const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');


MongoClient.connect('mongodb://admin:pixelpicasso1@ds133632.mlab.com:33632/pixelpicasso', (err, client) => {
  if (err) return console.log(err)
  db = client.db('pixelpicasso') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: true }))


// mongoose.connect('mongodb://admin:pixelpicasso1@ds133632.mlab.com:33632/pixelpicasso');


// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/gridColors', (req, res) => {
  db.collection('gridColor').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})


app.get('/viewAll', (req, res) => {
  db.collection('gridColor').find().toArray((err, result) => {
    if (err) return console.log(err)

    var container = result;
    console.log("Number of stored objects:" + container.length)
    res.render('saved.ejs', {container:container })
  })
})


