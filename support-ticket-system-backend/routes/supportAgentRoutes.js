// routes/supportAgentRoutes.js

const express = require('express');
const router = express.Router();
const SupportAgent = require('../models/supportAgent');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;

    // Check if a support agent with the same name or email already exists
    const existingAgent = await SupportAgent.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${name}$`, 'i') } },
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
      ],
    });

    if (existingAgent) {
      return res.status(400).json({ message: 'Support agent with the same name or email already exists' });
    }

    // Continue with support agent creation if no duplicates are found
    const newAgent = new SupportAgent({
      name,
      email,
      phone,
      description,
      active: true,
      dateCreated: new Date(),
    });

    await newAgent.save();
    res.json(newAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
