import React from 'react';
import './LoginPage.css';

const LoginForm = ({
  role,
  identifiant,
  setIdentifiant,
  password,
  setPassword,
  handleSubmit
}) => {
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="identifiant">Identifiant</label>
        <input
          type="text"
          id="identifiant"
          placeholder="Votre identifiant"
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
  );
};

export default LoginForm;
