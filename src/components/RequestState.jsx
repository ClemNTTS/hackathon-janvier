import React from 'react';

const RequestState = ({ state }) => {
  const getStatusClass = () => {
    switch (state) {
      case 'new':
        return 'status-new';
      case 'in_progress':
        return 'status-in-progress';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  return (
    <div className="request-state">
      <span className={`status-dot ${getStatusClass()}`}></span>
      <span>{state}</span>
    </div>
  );
};

export default RequestState;
