// ViewTickets.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
 
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/support-tickets');
        setTickets(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching support tickets:', error.response.data);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h2>View Support Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Resolved On</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.topic}</td>
              <td>{ticket.description}</td>
              <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              <td>{ticket.severity}</td>
              <td>{ticket.type}</td>
              <td>{ticket.assignedTo}</td>
              <td>{ticket.status}</td>
              <td>{ticket.resolvedOn ? new Date(ticket.resolvedOn).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};  

export default ViewTickets;
