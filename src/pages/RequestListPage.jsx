import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequestState from '../components/RequestState';
import Header from '../components/Header';

const RequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch('/api/requests')
      .then(async (res) => { // Mark async to use await inside
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! Status: ${res.status}, Body: ${errorText}`);
        }
        const text = await res.text(); // Read response as text first
        try {
          return JSON.parse(text); // Then parse as JSON
        } catch (jsonError) {
          throw new Error(`JSON parsing error: ${jsonError.message}, Body: ${text}`);
        }
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err.message); // Set error message
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) { // Display error message if present
    return <div style={{ color: 'red' }}>Erreur: {error}. Veuillez vérifier que le serveur API est bien lancé (http://localhost:3001) et que le proxy Vite est correctement configuré.</div>;
  }

  if (requests.length === 0) {
    return (
        <>
            <Header />
            <div className="request-list-page">
                <h2>Toutes les demandes</h2>
                <div>Aucune demande trouvée.</div>
            </div>
        </>
    );
  }

  return (
    <>
      <Header />
      <div className="request-list-page">
        <h2>Toutes les demandes</h2>
        <div className="request-list">
          {requests.map((request) => (
            <div key={request.id} className="request-list-item">
              <div className="request-list-item-info">
                <p><strong>Adresse :</strong> {request.address}</p>
                <p><strong>Catégorie :</strong> {request.problemCategory}</p>
              </div>
              <div className="request-list-item-state">
                <RequestState state={request.state} />
              </div>
              <div className="request-list-item-actions">
                <Link to={`/manager/request/${request.id}`}>Vue Manager</Link>
                <Link to={`/factor/request/${request.id}`}>Vue Facteur</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RequestListPage;
