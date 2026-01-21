import React from 'react';
import './LoginPage.css';

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="role-selector">
      <button
        type="button"
        className={`role-btn ${role === 'facteur' ? 'active' : ''}`}
        onClick={() => setRole('facteur')}
      >
        Facteur
      </button>
      <button
        type="button"
        className={`role-btn ${role === 'manager' ? 'active' : ''}`}
        onClick={() => setRole('manager')}
      >
        Manager
      </button>
    </div>
  );
};

export default RoleSelector;
