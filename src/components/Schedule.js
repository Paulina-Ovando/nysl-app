import React from 'react';
import data from '../data/nysl_data.json'; // Importamos la base de datos local

const Schedule = () => {
    // Convertimos el objeto de partidos en un arreglo para poder iterarlo con .map()
    const games = Object.values(data.games);
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
                        {games.map((game, index) => {
                            // Extraemos la información completa de la escuela usando la llave (ej. "AJ_Katzenmaier")
                            const locationInfo = locations[game.location];

                            return (
                                <tr key={index}>
                                    <td className="fw-bold">{game.date}</td>
                                    <td>{game.time}</td>
                                    <td>{game.teams}</td>
                                    <td>
                                        <a href={locationInfo.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-bold">
                                            {locationInfo.name}
                                        </a>
                                        <br />
                                        <small className="text-muted">{locationInfo.address}</small>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Schedule;