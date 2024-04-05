import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GlobeComponent from './components/GlobeComponent';
import DetailedCountryGlobe from './components/DetailedCountryGlobe'; // Ensure this component exists

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<GlobeComponent />} />
            <Route path="/country/:countryCode" element={<DetailedCountryGlobe />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
