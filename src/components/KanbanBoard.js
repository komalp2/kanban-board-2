import React from 'react';

const KanbanBoard = ({ tickets, groupBy, sortOption }) => {
  if (!Array.isArray(tickets)) {
    return <p>No tickets available</p>;
  }

  // Group and sort tickets as before
  const groupTickets = (tickets, groupBy, sortOption) => {
    let grouped = {};
    tickets.forEach(ticket => {
      const key = ticket[groupBy];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    const sortedGroups = Object.entries(grouped).map(([label, items]) => ({
      label,
      items: items.sort((a, b) => {
        if (sortOption === 'priority') return b.priority - a.priority;
        if (sortOption === 'title') return a.title.localeCompare(b.title);
        return 0;
      })
    }));

    return sortedGroups;
  };

  const groupedTickets = groupTickets(tickets, groupBy, sortOption);

  return (
    <div className="kanban-board">
      {groupedTickets.map((group) => (
        <div key={group.label} className="kanban-column">
          <h2>{group.label}</h2>
          {group.items.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.title}</h3>
              <p>Status: {ticket.status}</p>
              <p>User: {ticket.user}</p>
              <p>Priority: {ticket.priority}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
