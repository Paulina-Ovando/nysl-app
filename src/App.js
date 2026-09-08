import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Schedule from './components/Schedule';
// Importamos el nuevo componente
import GameDetails from './components/GameDetails';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100 pb-5">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Schedule />} />
          {/* Ruta dinámica. El ':id' actuará como comodín */}
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;