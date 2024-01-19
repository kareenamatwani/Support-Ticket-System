// src/components/supportAgentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SupportAgentForm = () => {
  const [agentData, setAgentData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setAgentData({ ...agentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation logic
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(agentData.email)) {
        setError('Invalid email format');
        return;
      }

      // Validate phone number format (only allow 10 numbers)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(agentData.phone)) {
        setError('Invalid phone number format. It should contain 10 numbers');
        return;
      }

      const response = await axios.post('http://127.0.0.1:5000/api/support-agents/', agentData);
      console.log(response.data);

      // Handle success response
      setSuccessMessage('Support agent created successfully!');
      setError('');

      // Clear success message after 4 seconds
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      console.error('Error creating support agent:', error);

      // Handle error response in your UI (e.g., show an error message)
      setError('Internal Server Error');
      setSuccessMessage('');

      // Clear error message after 4 seconds
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Support Agent</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={agentData.name} onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={agentData.email} onChange={handleInputChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={agentData.phone} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={agentData.description} onChange={handleInputChange} required />
        </label>
        <button type="submit" className='support-ticket'>Create Support Agent</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SupportAgentForm;
