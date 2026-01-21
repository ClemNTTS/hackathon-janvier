import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequestState from '../components/RequestState';
import Header from '../components/Header';

const RequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/requests')
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header />
      <div className="request-list-page">
        <h2>Toutes les demandes</h2>
        <div className="request-list">
          {requests.map((request) => (
            <div key={request.UUID} className="request-list-item">
              <div className="request-list-item-info">
                <p><strong>Adresse :</strong> {request.address}</p>
                <p><strong>Catégorie :</strong> {request.problemCategory}</p>
              </div>
              <div className="request-list-item-state">
                <RequestState state={request.state} />
              </div>
              <div className="request-list-item-actions">
                <Link to={`/manager/request/${request.UUID}`}>Vue Manager</Link>
                <Link to={`/factor/request/${request.UUID}`}>Vue Facteur</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RequestListPage;