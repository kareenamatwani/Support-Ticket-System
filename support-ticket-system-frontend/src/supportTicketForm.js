// SupportTicketForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const SupportTicketForm = () => {
  const [ticketData, setTicketData] = useState({
    topic: '',
    description: '',
    severity: '',
    type: '', // Changed from input to select
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/support-tickets/', ticketData);
      console.log(response.data);

      // Handle success response
      setSuccessMessage('Ticket created successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating support ticket:', error.response.data);
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input type="text" name="topic" value={ticketData.topic} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={ticketData.description} onChange={handleInputChange} required />
        </label>
        <label>
          Severity:
          <input type="text" name="severity" value={ticketData.severity} onChange={handleInputChange} required />
        </label>
        <label>
          Type:
          <select name="type" value={ticketData.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option value="Bug">Bug</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Enhancement">Enhancement</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <button type="submit" className='support-ticket'>Create Support Ticket</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default SupportTicketForm;
