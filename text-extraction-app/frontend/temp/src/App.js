import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ResultPage from './ResultPage';

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/result" element={<ResultPage />} /> {/* Make sure this route exists */}
</Routes>
    
      </div>
    </Router>
  );
}

export default App;
