import RequestState from '../RequestState'; // Import RequestState component

function TicketCard({ ticket, onClick }) {
    const formatDate = (date) => {
        const now = new Date();
        const ticketDate = new Date(date);
        const diffInHours = Math.floor((now - ticketDate) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - ticketDate) / (1000 * 60));
            return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
        } else if (diffInHours < 24) {
            return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
        }
    };

    const getProblemIcon = (problemType) => {
        const icons = {
            'Boîte endommagée': '🔨',
            'Serrure défectueuse': '🔐',
            'Porte cassée': '🚪',
            'Boîte vandalisée': '⚠️',
            'Problème d\'accès': '🚫',
            'Boîte pleine/bloquée': '📦',
            'Autre': '❓'
        };
        return icons[problemType] || '📮';
    };

    // Determine the ticket card's border color based on its state
    let borderColorClass = '';
    switch (ticket.state) {
        case 'new':
            borderColorClass = 'status-new';
            break;
        case 'decision_made':
            borderColorClass = 'status-decision-made';
            break;
        case 'problem_handled':
            borderColorClass = 'status-problem-handled';
            break;
        case 'closed':
            borderColorClass = 'status-closed';
            break;
        default:
            borderColorClass = 'status-default';
            break;
    }

    return (
        <div className={`ticket-card ${borderColorClass}`} onClick={onClick}>
            <div className="ticket-card-header">
                <span className="ticket-id">#{ticket.id}</span>
                <div className="ticket-header-right">
                    <RequestState state={ticket.state} /> {/* Use RequestState component */}
                    <span className="ticket-time">{formatDate(ticket.createdAt)}</span>
                </div>
            </div>

            <div className="ticket-card-body">
                <div className="ticket-problem">
                    <span className="problem-icon">{getProblemIcon(ticket.problemType)}</span>
                    <span className="problem-type">{ticket.problemType}</span>
                </div>

                <div className="ticket-address">
                    <span className="address-icon">📍</span>
                    <span className="address-text">{ticket.address}</span>
                </div>

                {ticket.notes && (
                    <div className="ticket-notes">
                        <span className="notes-icon">📝</span>
                        <span className="notes-text">{ticket.notes}</span>
                    </div>
                )}

                {ticket.photo && (
                    <div className="ticket-has-photo">
                        <span className="photo-badge">📷 Photo jointe</span>
                    </div>
                )}
            </div>

            <div className="ticket-card-footer">
                <span className="view-details">Voir les détails →</span>
            </div>
        </div>
    );
}

export default TicketCard;
