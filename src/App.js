import React, { useState, useEffect } from 'react';
import { fetchTickets } from './api';
import KanbanBoard from './components/KanbanBoard';


import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);

  const [groupBy, setGroupBy] = useState('status');
  const [sortOption, setSortOption] = useState('priority');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTickets = async () => {
      try {
        setLoading(true);
        const data = await fetchTickets();
        console.log(data); // Log data to inspect its structure
        setTickets(data.tickets || data); // Use data.tickets if it exists; otherwise, use data directly
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to load tickets.");
        setLoading(false);
      }
    };
    getTickets();
  }, []);
  
  

  return (
    <div className="kanban-container">
      <h1 className="kanban-title">Kanban Board</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="controls">
            <button onClick={() => setGroupBy('status')}>Group by Status</button>
            <button onClick={() => setGroupBy('user')}>Group by User</button>
            <button onClick={() => setGroupBy('priority')}>Group by Priority</button>
            <button onClick={() => setSortOption('priority')}>Sort by Priority</button>
            <button onClick={() => setSortOption('title')}>Sort by Title</button>
          </div>
          <KanbanBoard tickets={tickets} groupBy={groupBy} sortOption={sortOption} />
        </>
      )}
    </div>
  );
};

export default App;
