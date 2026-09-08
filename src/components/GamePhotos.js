import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserState, database } from '../utilities/firebase';
import { UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../utilities/cloudinary';
// Importamos las herramientas de la base de datos
import { ref, push, serverTimestamp } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';

const GamePhotos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useUserState();

    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const cameraInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    // REFERENCIA A FIREBASE: Apuntamos al nodo de imágenes de este partido
    const photosRef = ref(database, `pictures/${id}`);

    // Obtenemos los datos en tiempo real (usamos useObjectVal igual que en el chat)
    const [photosData, loading, error] = useObjectVal(photosRef);
    const gamePhotos = photosData || {};

    // Ordenamos las fotos para que las más nuevas aparezcan primero en la galería
    const sortedPhotos = Object.entries(gamePhotos).sort(
        ([, a], [, b]) => b.timestamp - a.timestamp
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            // 1. Subir la imagen a Cloudinary
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", UPLOAD_PRESET);

            const response = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            // 2. Guardar la URL, el autor y la fecha en Firebase Realtime Database
            await push(photosRef, {
                author: user.email,
                url: data.secure_url,
                timestamp: serverTimestamp()
            });

            // 3. Limpiar la interfaz tras un guardado exitoso
            setSelectedFile(null);
                if (cameraInputRef.current) cameraInputRef.current.value = "";
                if (galleryInputRef.current) galleryInputRef.current.value = "";
        } catch (error) {
            console.error("Error al subir imagen:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container my-4 d-flex flex-column" style={{ minHeight: '75vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-outline-secondary btn-sm shadow-sm" onClick={() => navigate(`/game/${id}`)}>
                    ← Back to Game
                </button>
                <h3 className="h4 text-info fw-bold mb-0">Game Photos</h3>
            </div>

            {/* SECCIÓN DE LA GALERÍA */}
            <div className="flex-grow-1 bg-white p-3 border rounded shadow-sm mb-4">
                {loading && <p className="text-center text-muted mt-3">Loading gallery...</p>}
                {error && <p className="text-center text-danger mt-3">Error loading photos.</p>}

                {!loading && sortedPhotos.length === 0 ? (
                    <p className="text-muted text-center mt-4">No photos yet. Be the first to add a memory!</p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {sortedPhotos.map(([photoId, photo]) => {
                            const timeValue = photo.timestamp ? new Date(photo.timestamp) : new Date();
                            const timeString = timeValue.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

                            return (
                                <div key={photoId} className="col">
                                    <div className="card h-100 shadow-sm border-0">
                                        {/* Imagen con un alto fijo para que la galería se vea uniforme */}
                                        <img
                                            src={photo.url}
                                            className="card-img-top rounded-top"
                                            alt="Game highlight"
                                            style={{ objectFit: 'cover', height: '250px' }}
                                        />
                                        <div className="card-footer bg-light border-0 text-muted d-flex flex-column">
                                            <small className="fw-bold text-info">{photo.author}</small>
                                            <small style={{ fontSize: '0.75rem' }}>{timeString}</small>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* CONTROLES DE SUBIDA */}
            <div className="bg-light p-3 rounded shadow-sm mt-auto">
                <label className="form-label fw-bold text-secondary mb-3">Add a Game Photo</label>

                {/* INPUTS OCULTOS */}
                <input
                    type="file"
                    id="cameraInput"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    ref={cameraInputRef}
                    className="d-none" /* d-none oculta el elemento */
                />
                <input
                    type="file"
                    id="galleryInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={galleryInputRef}
                    className="d-none"
                />

                {/* BOTONES VISIBLES (Labels enlazados a los inputs ocultos) */}
                <div className="d-flex gap-2 mb-3">
                    <label htmlFor="cameraInput" className="btn btn-outline-primary flex-fill fw-bold m-0 shadow-sm">
                        📷 Camera
                    </label>
                    <label htmlFor="galleryInput" className="btn btn-outline-secondary flex-fill fw-bold m-0 shadow-sm">
                        🖼️ Gallery
                    </label>
                </div>

                {/* Mensaje de confirmación del archivo seleccionado */}
                {selectedFile && (
                    <div className="alert alert-success py-2 mb-3 text-center shadow-sm">
                        <small>Ready to post: <strong>{selectedFile.name}</strong></small>
                    </div>
                )}

                {/* Botón de Enviar */}
                <button
                    className="btn btn-info w-100 fw-bold text-white shadow-sm"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                >
                    {isUploading ? 'Uploading & Saving...' : 'Post Photo'}
                </button>
            </div>
        </div>
    );
};

export default GamePhotos;