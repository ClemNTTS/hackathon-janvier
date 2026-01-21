import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

const PostmanPage = () => {
    return (
        <>
            <Header />
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Espace Facteur</h1>
                <p>Bienvenue dans votre espace facteur.</p>
                <Link to="/requests">Voir toutes les demandes</Link>
            </div>
        </>
    );
};

export default PostmanPage;