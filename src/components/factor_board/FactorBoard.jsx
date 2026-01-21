import { useState } from 'react';
import CreateTicketForm from './CreateTicketForm';
import TicketsList from './TicketsList';
import './FactorBoard.css';

function FactorBoard() {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            address: '123 Rue de la Poste, 75001 Paris',
            problemType: 'Boîte endommagée',
            notes: 'Porte cassée, impossible d\'ouvrir',
            photo: null,
            status: 'en_cours',
            createdAt: new Date('2026-01-20T10:30:00')
        },
        {
            id: 2,
            address: '45 Avenue des Lettres, 75002 Paris',
            problemType: 'Serrure défectueuse',
            notes: 'Clé ne tourne plus',
            photo: null,
            status: 'en_cours',
            createdAt: new Date('2026-01-19T14:15:00')
        }
    ]);

    const [showValidation, setShowValidation] = useState(false);
    const [lastCreatedTicket, setLastCreatedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTicket = (ticketData) => {
        const newTicket = {
            id: tickets.length + 1,
            ...ticketData,
            status: 'en_cours',
            createdAt: new Date()
        };

        setTickets([newTicket, ...tickets]);
        setLastCreatedTicket(newTicket);
        setIsModalOpen(false); // Fermer le modal
        setShowValidation(true);

        // Masquer la validation après 3 secondes
        setTimeout(() => {
            setShowValidation(false);
        }, 3000);
    };

    const handleTicketClick = (ticketId) => {
        // TODO: Navigation vers la page de détail du ticket
        console.log(`Navigation vers le ticket #${ticketId}`);
        // Votre collègue gérera cette partie
    };

    return (
        <div className="factor-board">
            <header className="factor-board-header">
                <h1>Tableau de Bord Facteur</h1>
                <p className="subtitle">Gestion des boîtes aux lettres défectueuses</p>
                <button
                    className="open-modal-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="button-icon">➕</span>
                    Signaler une Boîte Défectueuse
                </button>
            </header>

            {showValidation && lastCreatedTicket && (
                <div className="validation-popup">
                    <div className="validation-content">
                        <div className="validation-icon">✓</div>
                        <h3>Ticket créé avec succès !</h3>
                        <p><strong>Adresse :</strong> {lastCreatedTicket.address}</p>
                        <p><strong>Problème :</strong> {lastCreatedTicket.problemType}</p>
                        <p><strong>Numéro :</strong> #{lastCreatedTicket.id}</p>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close-button"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                        <CreateTicketForm
                            onSubmit={handleCreateTicket}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            <div className="factor-board-content">
                <section className="tickets-list-section full-width">
                    <TicketsList
                        tickets={tickets}
                        onTicketClick={handleTicketClick}
                    />
                </section>
            </div>
        </div>
    );
}

export default FactorBoard;
