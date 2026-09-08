import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/nysl_data.json';

const Schedule = () => {
    const navigate = useNavigate();
    // Object.entries nos da arreglos de [llave, valor] para no perder el ID
    const gamesEntries = Object.entries(data.games);
    const locations = data.locations;

    return (
        <div className="container my-4">
            <h2 className="mb-4 text-center fw-bold text-success">Fall Game Schedule</h2>

            <div className="table-responsive shadow-sm">
                <table className="table table-bordered table-striped table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Teams</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gamesEntries.map(([gameId, game]) => {
                            const locationInfo = locations[game.location];

                            return (
                                <tr key={gameId} onClick={() => navigate(`/game/${gameId}`)} style={{ cursor: 'pointer' }}>
                                    <td className="fw-bold">{game.date}</td>
                                    <td>{game.time}</td>
                                    <td>{game.teams}</td>
                                    <td>{locationInfo.name}</td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Schedule;