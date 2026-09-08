import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserState, database } from '../utilities/firebase';
// Importamos push para agregar a la lista y serverTimestamp para la hora exacta
import { ref, push, serverTimestamp } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';

const ChatBoard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useUserState();

    // NUEVO: Estado para guardar lo que el usuario está escribiendo
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const messagesRef = ref(database, `messages/${id}`);
    const [messagesData, loading, error] = useObjectVal(messagesRef);

    const gameMessages = messagesData || {};
    const sortedMessages = Object.entries(gameMessages).sort(
        ([, a], [, b]) => a.timestamp - b.timestamp
    );

    // NUEVO: Función que se ejecuta al enviar el formulario
    const handlePostMessage = async (e) => {
        e.preventDefault(); // Evita que el navegador recargue la página

        const textToPost = newMessage.trim();
        if (textToPost === '') return; // Si está vacío, no hacemos nada

        try {
            // push() genera un ID único automáticamente dentro de nuestro partido
            await push(messagesRef, {
                author: user.email,
                text: textToPost,
                timestamp: serverTimestamp() // Usa la hora del servidor de Firebase
            });

            // Limpiamos la caja de texto después de un envío exitoso
            setNewMessage('');
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return (
        <div className="container my-4 d-flex flex-column" style={{ height: '75vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-outline-secondary btn-sm shadow-sm" onClick={() => navigate(`/game/${id}`)}>
                    ← Back to Game
                </button>
                <h3 className="h4 text-success fw-bold mb-0">Game Chat</h3>
            </div>

            <div className="flex-grow-1 overflow-auto bg-white p-3 border rounded shadow-sm mb-3">
                {loading && <p className="text-center text-muted mt-5">Loading messages...</p>}
                {error && <p className="text-center text-danger mt-5">Error loading messages.</p>}

                {!loading && sortedMessages.length === 0 ? (
                    <p className="text-muted text-center mt-5">No messages yet. Be the first to post!</p>
                ) : (
                    sortedMessages.map(([msgId, msg]) => {
                        // Manejamos el caso en que el timestamp apenas se está generando en el servidor
                        const timeValue = msg.timestamp ? new Date(msg.timestamp) : new Date();
                        const timeString = timeValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                            <div key={msgId} className="mb-3">
                                <div className="d-flex justify-content-between align-items-end mb-1">
                                    <small className="fw-bold text-primary">{msg.author}</small>
                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>{timeString}</small>
                                </div>
                                <div className="p-2 bg-light rounded border d-inline-block w-100 shadow-sm">
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* NUEVO: Convertimos los inputs en un formulario real */}
            <form className="input-group mt-auto shadow-sm" onSubmit={handlePostMessage}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                {/* El botón se deshabilita automáticamente si no hay texto */}
                <button type="submit" className="btn btn-success" disabled={!newMessage.trim()}>
                    Post
                </button>
            </form>
        </div>
    );
};

export default ChatBoard;