import TicketCard from './TicketCard';

function TicketsList({ tickets, onTicketClick }) {
    const activeTickets = tickets.filter(ticket => ticket.status === 'en_cours');

    return (
        <div className="tickets-list">
            <h2>📋 Tickets en Cours</h2>

            {activeTickets.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>Aucun ticket en cours</p>
                    <p className="empty-subtitle">Créez un nouveau ticket pour signaler un problème</p>
                </div>
            ) : (
                <div className="tickets-grid">
                    {activeTickets.map((ticket) => (
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
