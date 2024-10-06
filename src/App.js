import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import ProfessorPage from './pages/ProfessorPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import WordSearchGamePage from './pages/WordSearchGamePage';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        {!user ? (
          <Route path="*" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
        ) : user.role === 'professor' ? (
          <Route path="/" element={<ProfessorPage user={user} />} />
        ) : (
          <>
            <Route path="/" element={<StudentDashboardPage user={user} />} />
            <Route path="/game/:code" element={<WordSearchGamePage user={user} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
