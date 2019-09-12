const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ticket = new Schema({
    priority: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    permission: {
        type: String
    },
    dueDate: {
      type: Date
    },
    instruction: {
      type: String
    },
    status: {
      type: String
    }
});

module.exports = mongoose.model('Ticket', Ticket);