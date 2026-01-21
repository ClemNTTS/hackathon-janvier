import React, { useState } from 'react';
import './LoginPage.css';

const OTPForm = ({ handleSubmit }) => {
  const [otp, setOtp] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(otp); // Pass OTP back to parent
  };

  return (
    <form className="login-form" onSubmit={onFormSubmit}>
      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Authentification</h3>
      <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
        Veuillez entrer le code reçu par SMS/Email.
      </p>
      
      <div className="form-group">
        <label htmlFor="otp">Code OTP</label>
        <input
          type="text"
          id="otp"
          placeholder="Ex: 123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-btn">
        Valider
      </button>
    </form>
  );
};

export default OTPForm;
