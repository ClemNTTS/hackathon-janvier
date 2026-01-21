import React, { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import requestsData from '../../requests.json';
import './Map.css';

// Replace with your actual Mapbox token or use an env variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xh...';

const MapComponent = () => {
    const [popupInfo, setPopupInfo] = useState(null);

    const pins = useMemo(
        () =>
            requestsData.map((request, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={request.longitude}
                    latitude={request.latitude}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(request);
                    }}
                >
                    <div className="pin">📍</div>
                </Marker>
            )),
        []
    );

    return (
        <div className="map-container">
            <Map
                initialViewState={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    zoom: 12
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {pins}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className="popup-content">
                            <h3>{popupInfo.problemCategory}</h3>
                            <p>{popupInfo.detail}</p>
                            <p>State: {popupInfo.state}</p>
                            {popupInfo.PicturePath && <img width="100%" src={popupInfo.PicturePath} alt="Issue" />}
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default MapComponent;
