import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [role, setRole] = useState('facteur'); // Default to 'facteur'
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Login attempt - Role: ${role}, ID: ${identifiant}`);
    // Add logic here (e.g., API call)
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-placeholder">
          <div className="logo-icon">P</div>
          <span>La Poste</span>
        </div>

        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Connexion</h2>

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

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifiant">Identifiant {role === 'manager' ? 'RH' : 'Facteur'}</label>
            <input
              type="text"
              id="identifiant"
              placeholder={`Votre identifiant ${role}`}
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Se connecter
          </button>
        </form>

        <div className="help-text">
          <p>Mot de passe oublié ? <a href="#">Réinitialiser</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
