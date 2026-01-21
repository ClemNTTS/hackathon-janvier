import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Logo from './Logo';
import RoleSelector from './RoleSelector';
import LoginForm from './LoginForm';
import OTPForm from './OTPForm';

const HomePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login' or 'otp'
  const [role, setRole] = useState('facteur');
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(`Login attempt - Role: ${role}, ID: ${identifiant}`);
    // Simulate API validation
    setStep('otp');
  };

  const handleOTPSubmit = (otpCode) => {
      console.log(`OTP Submitted: ${otpCode}`);
      // Simulate OTP validation
      if (role === 'facteur') {
          navigate('/factor');
      } else if (role === 'manager') {
          navigate('/manager');
      }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Logo />

        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
            {step === 'login' ? 'Connexion' : 'Code de sécurité'}
        </h2>

        {step === 'login' && (
            <>
                <RoleSelector role={role} setRole={setRole} />
                <LoginForm
                role={role}
                identifiant={identifiant}
                setIdentifiant={setIdentifiant}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleLoginSubmit}
                />
            </>
        )}

        {step === 'otp' && (
            <OTPForm handleSubmit={handleOTPSubmit} />
        )}

        {step === 'login' && (
            <div className="help-text">
            <p>Mot de passe oublié ? <a href="#">Réinitialiser</a></p>
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
