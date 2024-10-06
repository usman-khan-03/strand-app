import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Flashcards from '../components/Flashcards/Flashcards';
import './StudentDashboardPage.scss';

function StudentDashboardPage({ user }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [previousStats, setPreviousStats] = useState([
    // Dummy data
    {
      topic: 'Biology',
      date: '2023-09-15',
      score: 5,
      words: [
        { word: 'Cell', definition: 'The basic structural unit of living organisms.' },
        { word: 'Gene', definition: 'A unit of heredity transferred from parent to offspring.' },
        // Add more words as needed
      ],
    },
    // Add more stats if needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStats, setSelectedStats] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    navigate(`/game/${code}`);
  };

  const handleViewStats = (stats) => {
    setSelectedStats(stats);
    setIsModalOpen(true);
    setShowFlashcards(false);
  };

  return (
    <div className="dashboard">
      <h2>Hey {user.name}!</h2>
      <form className="dashboard__join-form" onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="Enter Word Search Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>
      <div className="dashboard__stats">
        <h3>Your Previous Word Searches</h3>
        <ul>
          {previousStats.map((stat, index) => (
            <li key={index}>
              <span>
                {stat.date} - {stat.topic}
              </span>
              <button onClick={() => handleViewStats(stat)}>View</button>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && selectedStats && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="stats-modal">
            <h3>
              {selectedStats.topic} - {selectedStats.date}
            </h3>
            {!showFlashcards ? (
              <>
                <ul>
                  {selectedStats.words.map((wordObj, idx) => (
                    <li key={idx}>
                      <strong>{wordObj.word}</strong>: {wordObj.definition}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowFlashcards(true)}>View as Flashcards</button>
              </>
            ) : (
              <>
                <Flashcards wordsWithDefinitions={selectedStats.words} />
                <button onClick={() => setShowFlashcards(false)}>Back to List</button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default StudentDashboardPage;
