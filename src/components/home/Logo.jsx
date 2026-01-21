import React from 'react';
import './LoginPage.css';
import logoPoste from '../../assets/LogolaPoste.svg';

const Logo = () => {
  return (
    <div className="logo-placeholder">
      <img src={logoPoste} alt="La Poste" style={{ height: '50px' }} />
    </div>
  );
};

export default Logo;
