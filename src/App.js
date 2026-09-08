import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Schedule from './components/Schedule';
import GameDetails from './components/GameDetails';
import ChatBoard from './components/ChatBoard'; // Importamos el Chat

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100 pb-5">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Schedule />} />
          <Route path="/game/:id" element={<GameDetails />} />
          {/* Añadimos la ruta dinámica para el chat */}
          <Route path="/chat/:id" element={<ChatBoard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;