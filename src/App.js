import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Schedule from './components/Schedule';

function App() {
  return (
    <Router>
      <div className="App bg-light min-vh-100 pb-5">
        {/* La navegación se mostrará en todas las pantallas */}
        <Navigation />
        
        {/* Definición de las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;