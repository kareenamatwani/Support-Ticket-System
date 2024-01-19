// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const supportAgentRoutes = require('./routes/supportAgentRoutes'); 
const supportTicketRoutes = require('./routes/supportTicketRoutes'); 

// Use route handlers
app.use('/api/support-agents', supportAgentRoutes);
app.use('/api/support-tickets', supportTicketRoutes); 

mongoose.connect('mongodb://127.0.0.1:27017/support-ticket-system', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
