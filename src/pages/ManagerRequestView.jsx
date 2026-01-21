import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MuiStepper from '../components/MuiStepper';
import RequestState from '../components/RequestState';
import PrivateChat from '../components/PrivateChat';
import Header from '../components/Header';
import SanctionModal from '../components/SanctionModal';
import '../../src/components/factor_board/FactorBoard.css';
import '../../src/components/factor_board/TicketStatus.css';
import '../../src/components/factor_board/TicketRow.css';
import './FactorRequestView.css';

const ManagerRequestView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [id]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const updateRequest = async (updatedData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setRequest(data); // Update local state with the response from the server
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleSanction = (sanctionType) => {
    updateRequest({ state: 'decision_made', contactMethod: sanctionType });
    handleCloseModal();
  };

  const handleProblemHandled = () => {
    updateRequest({ state: 'problem_handled' });
  };

  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!request) {
    return <div>Demande non trouvée</div>;
  }

  const getStepFromState = () => {
    switch (request.state) {
      case 'new':
        return 0;
      case 'decision_made':
        return 1;
      case 'problem_handled':
        return 2;
      case 'closed':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="factor-board">
      <Header />
      <div className="factor-board-content">
        <div className="chat-container">
          <PrivateChat />
        </div>
        <div className="details-container">
          <MuiStepper currentStep={getStepFromState()} />
          <div className="request-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <span className="button-icon">⬅️</span> Retour
            </button>
            <h2>Détails de la demande</h2>
            <RequestState state={request.state} />
          </div>
          <div className="request-content">
            <div className="request-info">
              <img src={request.PicturePath} alt="Request" className="request-image" />
              <p><strong>Adresse :</strong> {request.address}</p>
              <p><strong>Catégorie :</strong> {request.problemCategory}</p>
              {request.detail && <p><strong>Détails :</strong> {request.detail}</p>}
            </div>
            <div className="request-actions">
              {request.state === 'new' && (
                <button className="sanction-button" onClick={handleOpenModal}>
                  Sélectionner une action
                </button>
              )}
              {request.state === 'decision_made' && (
                <button className="problem-handled-button" onClick={handleProblemHandled}>
                  Indiquer le problème comme géré
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <SanctionModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleSanction={handleSanction}
      />
    </div>
  );
};

export default ManagerRequestView;