import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { signInWithGoogle, signOutUser, useUserState } from '../utilities/firebase';

const Navigation = () => {
    const [user] = useUserState();
    const location = useLocation();
    const isGamePage = location.pathname.startsWith('/game/');
    const gameId = isGamePage ? location.pathname.split('/')[2] : null;

    // Estado para controlar el menú hamburguesa en móviles
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 shadow-sm">
            <div className="container">
                <span className="navbar-brand fw-bold text-success">NYSL</span>

                {/* Botón de hamburguesa para móviles */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenedor colapsable */}
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''} mt-3 mt-md-0`}>
                    <div className="navbar-nav me-auto">
                        <NavLink className="nav-link" to="/" end onClick={closeMenu}>Home</NavLink>
                        <NavLink className="nav-link" to="/games" onClick={closeMenu}>Schedule</NavLink>

                        {user && isGamePage && gameId && (
                            <>
                                <NavLink className="nav-link text-warning fw-bold" to={`/chat/${gameId}`} onClick={closeMenu}>
                                    💬 Chat
                                </NavLink>
                                <NavLink className="nav-link text-info fw-bold" to={`/photos/${gameId}`} onClick={closeMenu}>
                                    📸 Photos
                                </NavLink>
                            </>
                        )}
                    </div>

                    <div className="d-flex align-items-center mt-2 mt-md-0">
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-white small d-none d-lg-block">Hola, {user.displayName}</span>
                                <button className="btn btn-outline-danger btn-sm w-100" onClick={() => { signOutUser(); closeMenu(); }}>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-primary btn-sm shadow-sm w-100" onClick={() => { signInWithGoogle(); closeMenu(); }}>
                                Sign In with Google
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;