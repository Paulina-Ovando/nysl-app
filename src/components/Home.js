import React from "react";

const Home = () => {
    return (
        <div className="container my-4">
            <h2 className="mb-4 text-center fw-bold text-success">
                Northside Youth Soccer League
            </h2>

            {/* Tarjeta de Anuncios / Eventos */}
            <div className="card mb-4 shadow-sm border-0">
                <div className="card-header bg-success text-white">
                    <h3 className="h5 mb-0">Upcoming Events</h3>
                </div>
                <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <strong>August 4:</strong> NYSL Fundraiser
                        </li>
                        <li className="list-group-item">
                            <strong>August 16:</strong> Season Kick-off: Meet the Teams
                        </li>
                        <li className="list-group-item">
                            <strong>September 1:</strong> First Game of the Season (Check Game
                            Schedule for details)
                        </li>
                    </ul>
                </div>
            </div>

            {/* Tarjeta de Información de Contacto */}
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white">
                    <h3 className="h5 mb-0">Contact Information</h3>
                </div>
                <div className="card-body">
                    <p>
                        Please email us at{" "}
                        <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a>.
                    </p>
                    <p>We will reply to your email as soon as we can.</p>
                    <hr />
                    <h6 className="fw-bold">League Coordinator: Michael Randall</h6>
                    <p className="mb-1">
                        Phone: <a href="tel:6306908132">(630) 690-8132</a>
                    </p>
                    <p className="mb-0">
                        Email:{" "}
                        <a href="mailto:michael.randall@chisoccer.org">
                            michael.randall@chisoccer.org
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
