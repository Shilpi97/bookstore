var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre= require('./models/genre');
Books= require('./models/books');

// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('plz use /api/books or /api/genre');
});

app.get('/api/genres', function(req, res){
   Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
   });
});

app.get('/api/genres/:_id', function(req, res){
    Genre.getGenreById(req.params._id, function(err,genre){
         if(err){
             throw err;
         }
         res.json(genre);
    });
 });


app.post('/api/genres', function(req, res){
    var genre = req.body;
    Genre.addGenre(genre, function(err,genre){
         if(err){
             throw err;
         }
         res.json(genre);
    });
 });

 app.put('/api/genres/:id', function(req, res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {},  function(err,genre){
         if(err){
             throw err;
         }
         res.json(genre);
    });
 });

app.get('/api/books', function(req, res){
    Books.getBooks(function(err,books){
         if(err){
             throw err;
         }
         res.json(books);
    });
 });

 app.get('/api/books/:_id', function(req, res){
    Books.getBookById(req.params._id, function(err,book){
         if(err){
             throw err;
         }
         res.json(book);
    });
 });

 app.post('/api/books', function(req, res){
    var book = req.body;
    Books.addBook(book, function(err,book){
         if(err){
             throw err;
         }
         res.json(book);
    });
 });

 app.put('/api/books/:id', function(req, res){
    var id = req.params._id;
    var book = req.body;
    Books.updateBook(id, book, {},  function(err,book){
         if(err){
             throw err;
         }
         res.json(book);
    });
 });

 app.delete('/api/books/:id', function(req, res){
    var id = req.params._id;
    Books.removeBook(id, function(err,book){
         if(err){
             throw err;
         }
         res.json(book);
    });
 });

 app.delete('/api/genres/:id', function(req, res){
    var id = req.params._id;
    Genre.removeGenre(id, function(err,genre){
         if(err){
             throw err;
         }
         res.json(genre);
    });
 });


app.listen(3000);
console.log('Running on port 3000');
