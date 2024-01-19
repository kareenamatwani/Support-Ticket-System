// models/supportAgent.js

const mongoose = require('mongoose');

const supportAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: 'Invalid phone number format. Please provide a 10-digit phone number.',
    },
  },
  description: { type: String, required: true },
  active: { type: Boolean, default: true },
  dateCreated: { type: Date, default: Date.now },
});

supportAgentSchema.index({ name: 1, email: 1 }, { unique: true }); // Compound unique index on name and email

const SupportAgent = mongoose.model('SupportAgent', supportAgentSchema);

module.exports = SupportAgent;
