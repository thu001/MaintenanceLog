const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ticketRoutes = express.Router();
const PORT = 4000;

let Ticket = require('./ticket.model');

app.use(cors());
app.use(bodyParser.json());

//connect mongoose
// store credentials as enviroment variables
const dbuser = process.env.MONGODB 
const dbpass = process.env.MONGODBPASS

// TODO - Discuss connection uri
// Need to set mongoDB variable to the uri for your own database
const mongoDB = `mongodb+srv://thu:mongoDB@cluster0-fhxf5.mongodb.net/test?retryWrites=true`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

ticketRoutes.route('/').get(function(req, res) {
    Ticket.find(function(err, tickets) {
        if (err) {
            console.log(err);
        } else {
            res.json(tickets);
        }
    });
});

ticketRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Ticket.findById(id, function(err, ticket) {
        console.log(`params id is: ${id}`)
        console.log(ticket)
        res.json(ticket);
    });
});

ticketRoutes.route('/new').post(function(req, res) {
    let ticket = new Ticket(req.body);
    ticket.save()
        .then(ticket => {
            res.status(200).json({'ticket': 'ticket added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new ticket failed');
        });
});

ticketRoutes.route('/:id/edit').put(function(req, res) {
  Ticket.findByIdAndUpdate(req.params.id,{$set:req.body},{new: true}, function(err, result){
    if(err){
        console.log('error in put');
        console.log(err);
    }
    console.log("RESULT: " + result);
    res.json(result);
  });
});

ticketRoutes.route('/:id/delete').delete(function(req, res) {
  Ticket.findByIdAndRemove(req.params.id, function(err, ticket) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  });
});

app.use('/tickets', ticketRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});