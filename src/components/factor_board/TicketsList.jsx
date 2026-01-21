import TicketCard from './TicketCard';

function TicketsList({ tickets, onTicketClick }) {
    return (
        <div className="tickets-list">
            <h2>Toutes mes demandes</h2>

            {tickets.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>Aucune demande</p>
                    <p className="empty-subtitle">Créez une nouvelle demande pour signaler un problème</p>
                </div>
            ) : (
                <div className="tickets-grid">
                    {tickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onClick={() => onTicketClick(ticket.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TicketsList;
