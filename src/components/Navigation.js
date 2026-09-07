import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4 shadow-sm">
            <div className="container">
                <span className="navbar-brand fw-bold text-success">NYSL</span>
                <div className="navbar-nav">
                    {/* NavLink agrega automáticamente la clase 'active' cuando la ruta coincide */}
                    <NavLink className="nav-link" to="/" end>Home</NavLink>
                    <NavLink className="nav-link" to="/games">Schedule</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;