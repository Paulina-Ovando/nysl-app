import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data/nysl_data.json';

const GameDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const game = data.games[id];

    if (!game) {
        return <div className="container my-5 text-center"><h3>Game not found</h3></div>;
    }

    const locationInfo = data.locations[game.location];

    return (
        <div className="container my-4">
            {/* Botón para regresar al calendario */}
            <button
                className="btn btn-outline-secondary mb-3 shadow-sm"
                onClick={() => navigate('/games')}
            >
                ← Back to Schedule
            </button>

            <h2 className="mb-4 text-center fw-bold text-success">Game Details</h2>

            <div className="card shadow-sm border-0">
                <div className="card-header bg-success text-white">
                    <h3 className="h5 mb-0">{game.teams}</h3>
                </div>
                <div className="card-body">
                    <p className="mb-1"><strong>Date:</strong> {game.date}</p>
                    <p className="mb-1"><strong>Time:</strong> {game.time}</p>
                    <p className="mb-1"><strong>Location:</strong> {locationInfo.name}</p>
                    <p className="mb-3"><strong>Address:</strong> {locationInfo.address}</p>

                    {/* Contenedor del Mapa usando clases responsivas de Bootstrap */}
                    <div className="ratio ratio-4x3 mt-3 shadow-sm rounded overflow-hidden">
                        <iframe
                            title={`Map for ${locationInfo.name}`}
                            src={locationInfo.embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;