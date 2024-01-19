// models/supportTicket.js

const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  topic: String,
  description: String,
  dateCreated: Date,
  severity: String,
  type: String,
  assignedTo: String,
  status: String,
  resolvedOn: Date,
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

module.exports = SupportTicket;
