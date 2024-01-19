import React, { useState } from 'react';
import SupportAgentForm from './supportAgentForm';
import SupportTicketForm from './supportTicketForm';
import ViewTickets from './ViewTickets'; // Import the ViewTickets component
import './styles.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('supportTicket');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <div className="tabContainer">
        <button
          className={activeTab === 'supportTicket' ? 'activeTab' : ''}
          onClick={() => handleTabChange('supportTicket')}
        >
          Create Support Ticket
        </button>
        <button 
          className={activeTab === 'supportAgent' ? 'activeTab' : ''}
          onClick={() => handleTabChange('supportAgent')}
        >
          Create Support Agent
        </button>
        <button 
          className={activeTab === 'viewTickets' ? 'activeTab' : ''}
          onClick={() => handleTabChange('viewTickets')}
        >
          View Tickets
        </button>
      </div>
      {activeTab === 'supportTicket' ? <SupportTicketForm /> : null}
      {activeTab === 'supportAgent' ? <SupportAgentForm /> : null}
      {activeTab === 'viewTickets' ? <ViewTickets /> : null}
    </div>
  );
};

export default App;
