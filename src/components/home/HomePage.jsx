import React, { useState } from 'react';
import './LoginPage.css';
import Logo from './Logo';
import RoleSelector from './RoleSelector';
import LoginForm from './LoginForm';

const HomePage = () => {
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
        <Logo />

        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Connexion</h2>

        <RoleSelector role={role} setRole={setRole} />

        <LoginForm
          role={role}
          identifiant={identifiant}
          setIdentifiant={setIdentifiant}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />

        <div className="help-text">
          <p>Mot de passe oublié ? <a href="#">Réinitialiser</a></p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
