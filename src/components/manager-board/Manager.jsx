import { useNavigate } from 'react-router-dom';
import requestsData from '../../requests.json';
import './Manager.css';

function Manager() {
  const navigate = useNavigate();

  const handleRowClick = (uuid) => {
    navigate(`/manager/request/${uuid}`);
  };

  return (
    <div className="manager-container">
      <h1>Gestion des Requêtes - Boîtes aux Lettres</h1>
      <div className="table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Facteur</th>
              <th>Adresse</th>
              <th>Détails</th>
              <th>Statut</th>
              <th>Catégorie</th>
              <th>Date de Création</th>
            </tr>
          </thead>
          <tbody>
            {requestsData.map((request, index) => (
              <tr
                key={request.UUID}
                onClick={() => handleRowClick(request.UUID)}
                className="request-row"
              >
                <td>{index + 1}</td>
                <td>-</td>
                <td>{request.address}</td>
                <td>{request.detail || '-'}</td>
                <td>
                  <span className="status-badge status-pending">
                    En attente
                  </span>
                </td>
                <td>
                  <span className={`priority-badge`}>
                    {request.problemCategory}
                  </span>
                </td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manager;
