import { useState, useRef } from 'react';

const PROBLEM_TYPES = [
    'Boîte endommagée',
    'Serrure défectueuse',
    'Porte cassée',
    'Boîte vandalisée',
    'Problème d\'accès',
    'Boîte pleine/bloquée',
    'Autre'
];

const getProblemIcon = (type) => {
    const icons = {
        'Boîte endommagée': '🔨',
        'Serrure défectueuse': '🔐',
        'Porte cassée': '🚪',
        'Boîte vandalisée': '⚠️',
        'Problème d\'accès': '🚫',
        'Boîte pleine/bloquée': '📦',
        'Autre': '❓'
    };
    return icons[type] || '📮';
};

function CreateTicketForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        address: '',
        problemType: '',
        notes: '',
        photo: null
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('La géolocalisation n\'est pas supportée par votre navigateur');
            return;
        }

        setIsLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Utiliser Nominatim directement
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                        {
                            headers: {
                                'Accept-Language': 'fr'
                            }
                        }
                    );

                    const data = await response.json();

                    if (data.address) {
                        const address = data.address;
                        let formattedAddress = '';

                        // Construire l'adresse française
                        if (address.house_number) formattedAddress += address.house_number + ' ';
                        if (address.road) formattedAddress += address.road + ', ';
                        if (address.postcode) formattedAddress += address.postcode + ' ';
                        if (address.city || address.town || address.village) {
                            formattedAddress += (address.city || address.town || address.village);
                        }

                        setFormData(prev => ({
                            ...prev,
                            address: formattedAddress.trim() || data.display_name
                        }));
                    } else if (data.display_name) {
                        setFormData(prev => ({
                            ...prev,
                            address: data.display_name
                        }));
                    } else {
                        throw new Error('Pas d\'adresse trouvée');
                    }
                } catch (error) {
                    console.error('Erreur de géocodage:', error);
                    // En cas d'erreur, afficher les coordonnées
                    setFormData(prev => ({
                        ...prev,
                        address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                    }));
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                setIsLoadingLocation(false);
                let errorMessage = 'Erreur de géolocalisation';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Vous devez autoriser l\'accès à votre position';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Position non disponible';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Délai de géolocalisation dépassé';
                        break;
                }

                alert(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    photo: reader.result
                }));
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
            <h2>Signaler une Boîte aux Lettres non conforme</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="address">
                        Adresse Postale
                    </label>
                    <div className="address-input-container">
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Ex: 123 Rue de la Poste, 75001 Paris"
                            required
                        />
                        <button
                            type="button"
                            className="location-button"
                            onClick={handleGetLocation}
                            disabled={isLoadingLocation}
                            title="Utiliser ma position actuelle"
                        >
                            {isLoadingLocation ? (
                                <span className="loading-spinner">⟳</span>
                            ) : (
                                '📍'
                            )}
                        </button>
                    </div>
                    <p className="help-text">
                        Cliquez sur 📍 pour utiliser votre position GPS
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="problemType">
                        Type de Problème
                    </label>
                    <div className="problem-type-selector">
                        {PROBLEM_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={`problem-type-button ${formData.problemType === type ? 'selected' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, problemType: type }))}
                            >
                                <span className="problem-type-icon">{getProblemIcon(type)}</span>
                                <span className="problem-type-text">{type}</span>
                                {formData.problemType === type && <span className="check-icon">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="photo">
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

                    Envoyer ma demande
                </button>
            </form>
        </div>
    );
}

export default CreateTicketForm;
