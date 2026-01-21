import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

const ManagerPage = () => {
    return (
        <>
            <Header />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Espace Manager</h1>
                <p>Bienvenue dans votre espace manager.</p>
                <Link to="/requests">Voir toutes les demandes</Link>
            </div>
        </>
    );
};

export default ManagerPage;