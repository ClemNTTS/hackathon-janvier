import { useState, useRef } from 'react';

const PROBLEM_TYPES = [
    'Boîte endommagée',
    'Serrure défectueuse',
    'Boîte vandalisée',
    'Problème d\'accès',
    'Boîte pleine/bloquée',
    'Autre'
];

function CreateTicketForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        address: '',
        problemType: '',
        notes: '',
        photo: null
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                photo: file
            }));

            // Créer une prévisualisation
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setFormData(prev => ({
            ...prev,
            photo: null
        }));
        setPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.address || !formData.problemType) {
            alert('Veuillez remplir l\'adresse et sélectionner un type de problème');
            return;
        }

        onSubmit(formData);

        // Réinitialiser le formulaire
        setFormData({
            address: '',
            problemType: '',
            notes: '',
            photo: null
        });
        setPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="create-ticket-form">
            <h2>📮 Signaler une Boîte aux Lettres Défectueuse</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">
                        <span className="label-icon">📍</span>
                        Adresse Postale *
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Ex: 123 Rue de la Poste, 75001 Paris"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="problemType">
                        <span className="label-icon">⚠️</span>
                        Type de Problème *
                    </label>
                    <select
                        id="problemType"
                        name="problemType"
                        value={formData.problemType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">-- Sélectionner un problème --</option>
                        {PROBLEM_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="photo">
                        <span className="label-icon">📷</span>
                        Photo de la Boîte
                    </label>
                    <div className="photo-upload-container">
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            accept="image/*"
                            capture="environment"
                        />
                        <label htmlFor="photo" className="photo-upload-button">
                            {photoPreview ? '📸 Changer la photo' : '📸 Prendre une photo'}
                        </label>

                        {photoPreview && (
                            <div className="photo-preview">
                                <img src={photoPreview} alt="Aperçu" />
                                <button
                                    type="button"
                                    className="remove-photo-btn"
                                    onClick={handleRemovePhoto}
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">
                        <span className="label-icon">📝</span>
                        Notes Complémentaires
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Détails supplémentaires sur le problème..."
                        rows="4"
                    />
                </div>

                <button type="submit" className="submit-button">
                    <span className="button-icon">✉️</span>
                    Envoyer le Ticket
                </button>
            </form>
        </div>
    );
}

export default CreateTicketForm;
