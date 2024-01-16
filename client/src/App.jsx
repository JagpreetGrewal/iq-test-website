import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';
import Statistics from './pages/Statistics'
import Donate from './pages/Donate'
import CustomNavbar from './CustomNavbar'

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz/:id/result" element={<QuizResult />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
