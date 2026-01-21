import React from 'react';

const RequestState = ({ state }) => {
  const getStatusClass = () => {
    switch (state) {
      case 'new':
        return 'status-new';
      case 'decision_made':
        return 'status-decision-made';
      case 'problem_handled':
        return 'status-problem-handled';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-default'; // Fallback
    }
  };

  const getStatusLabel = () => {
    switch (state) {
        case 'new':
            return 'Nouveau';
        case 'decision_made':
            return 'Décision prise';
        case 'problem_handled':
            return 'Problème géré';
        case 'closed':
            return 'Clôturé';
        default:
            return 'Inconnu';
    }
  }

  return (
    <div className="request-state">
      <span className={`status-dot ${getStatusClass()}`}></span>
      <span className="status-label">{getStatusLabel()}</span>
    </div>
  );
};

export default RequestState;
