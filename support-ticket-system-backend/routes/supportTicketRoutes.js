// routes/supportTicketRoutes.js
const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/supportTicket');
const SupportAgent = require('../models/supportAgent');

let lastAssignedIndex = 0;

router.post('/', async (req, res) => {
  try {
    const { topic, description, severity, type } = req.body;

    // Validate severity (for example, ensure it is one of 'Low', 'Medium', 'High')
    if (!['Low', 'Medium', 'High'].includes(severity)) {
      return res.status(400).json({ error: 'InvalidSeverity', message: 'Invalid severity. Please choose from: Low, Medium, High' });
    }

    // Validate type (check if it is one of the predefined types)
    const validTypes = ['Bug', 'Feature Request', 'Technical Support', 'Enhancement', 'Other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'InvalidType', message: `Invalid type. Please choose from: ${validTypes.join(', ')}` });
    }

    // Validate date format (for example, ensure it is in YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (req.body.resolvedOn && !dateRegex.test(req.body.resolvedOn)) {
      return res.status(400).json({ error: 'InvalidDateFormat', message: 'Invalid date format. Please use YYYY-MM-DD' });
    }

    const agents = await SupportAgent.find({ active: true });

    if (agents.length === 0) {
      return res.status(400).json({ error: 'NoActiveAgents', message: 'No active support agents available' });
    }

    // Get the next agent in the round-robin sequence
    const assignedAgent = agents[lastAssignedIndex];

    // Update the index for the next ticket
    lastAssignedIndex = (lastAssignedIndex + 1) % agents.length;

    const newTicket = new SupportTicket({
      topic,
      description,
      dateCreated: new Date(),
      severity,
      type,
      assignedTo: assignedAgent._id,
      status: '', // Set the status to 'New' by default
      resolvedOn: null,
    });

    await newTicket.save();

    res.json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'InternalServerError', message: 'Internal Server Error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const supportTickets = await SupportTicket.find();
    res.json(supportTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'InternalServerError', message: 'Internal Server Error' });
  }
});
module.exports = router;
