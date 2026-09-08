import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { signInWithGoogle, signOutUser, useUserState } from '../utilities/firebase';

const Navigation = () => {
    const [user] = useUserState();
    const location = useLocation(); // Nos dice en qué URL estamos

    // Lógica: Verifica si la URL actual empieza con '/game/'
    const isGamePage = location.pathname.startsWith('/game/');
    // Si estamos en un partido, extraemos el ID de la URL dividiéndola por '/'
    const gameId = isGamePage ? location.pathname.split('/')[2] : null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4 shadow-sm">
            <div className="container">
                <span className="navbar-brand fw-bold text-success">NYSL</span>

                <div className="navbar-nav me-auto d-flex flex-row gap-3">
                    <NavLink className="nav-link" to="/" end>Home</NavLink>
                    <NavLink className="nav-link" to="/games">Schedule</NavLink>

                    {/* Renderizado Condicional: Solo si hay usuario, está en un partido y tenemos el ID */}
                    {user && isGamePage && gameId && (
                        <NavLink className="nav-link text-warning fw-bold" to={`/chat/${gameId}`}>
                            💬 Chat
                        </NavLink>
                    )}
                </div>

                <div className="d-flex align-items-center">
                    {user ? (
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-white small d-none d-md-block">Hola, {user.displayName}</span>
                            <button className="btn btn-outline-danger btn-sm" onClick={signOutUser}>
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-primary btn-sm shadow-sm" onClick={signInWithGoogle}>
                            Sign In with Google
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;