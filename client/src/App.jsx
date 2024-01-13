import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz'; // Import or create this component
import QuizResult from './pages/QuizResult';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz/:id/result" element={<QuizResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
