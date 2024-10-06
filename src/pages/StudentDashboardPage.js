import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Flashcards from '../components/Flashcards/Flashcards';
import './StudentDashboardPage.scss';

// Hardcoded grids with codes, words, and definitions
const grids = {
  '1': {
    code: '1',
    title: 'Computer Science Basics',
    wordsWithDefinitions: [
      { word: 'ALGORITHM', definition: 'A set of instructions to solve a problem.' },
      { word: 'BINARY', definition: 'A number system using base 2.' },
      { word: 'ARRAY', definition: 'A collection of elements identified by index.' },
      { word: 'CACHE', definition: 'A hardware or software component that stores data.' },
      { word: 'LOGIC', definition: 'Reasoning conducted according to strict principles.' },
      { word: 'CLASS', definition: 'A blueprint for creating objects in OOP.' },
      { word: 'INPUT', definition: 'Data provided to a computer or program.' },
      { word: 'NODE', definition: 'A basic unit used to build data structures.' },
      { word: 'BITS', definition: 'The smallest unit of data in computing.' },
    ],
  },
  '2': {
    code: '2',
    title: 'Finance Fundamentals',
    wordsWithDefinitions: [
      { word: 'EQUITY', definition: 'Ownership of assets after liabilities.' },
      { word: 'INCOME', definition: 'Money received, especially on a regular basis.' },
      { word: 'BOND', definition: 'A fixed income instrument representing a loan.' },
      { word: 'ASSET', definition: 'A resource with economic value.' },
      { word: 'DEBT', definition: 'Money owed by one party to another.' },
      { word: 'STOCK', definition: 'A type of security signifying ownership in a corporation.' },
      { word: 'RISK', definition: 'Exposure to uncertainty or loss.' },
      { word: 'YIELD', definition: 'Earnings generated on an investment.' },
      { word: 'CASH', definition: 'Money in coins or notes.' },
      { word: 'FUND', definition: 'A sum of money saved or made available for a purpose.' },
    ],
  },
  '3': {
    code: '3',
    title: 'Operations Management',
    wordsWithDefinitions: [
      { word: 'SUPPLY', definition: 'Total amount of a product available.' },
      { word: 'DEMAND', definition: 'Consumers’ desire to purchase goods and services.' },
      { word: 'PROCESS', definition: 'A series of actions to achieve a result.' },
      { word: 'LEAN', definition: 'A methodology to reduce waste in processes.' },
      { word: 'QUEUE', definition: 'A line of items awaiting processing.' },
      { word: 'BATCH', definition: 'A quantity produced at one operation.' },
      { word: 'COST', definition: 'An amount that has to be paid.' },
    ],
  },
  '4': {
    code: '4',
    title: 'Economics Terms',
    wordsWithDefinitions: [
      { word: 'MARKET', definition: 'A place where buyers and sellers meet.' },
      { word: 'PROFIT', definition: 'Financial gain after expenses.' },
      { word: 'DEMAND', definition: 'Consumers’ desire to purchase goods and services.' },
      { word: 'SUPPLY', definition: 'Total amount of a product available.' },
      { word: 'WAGES', definition: 'Regular payment for employment.' },
      { word: 'GROWTH', definition: 'Increase in economic output.' },
      { word: 'LABOR', definition: 'Work performed by people.' },
      { word: 'INFLATION', definition: 'General increase in prices over time.' },
      { word: 'COST', definition: 'An amount that has to be paid.' },
      { word: 'TRADE', definition: 'Exchange of goods and services.' },
      { word: 'CAPITAL', definition: 'Wealth in the form of money or assets.' },
    ],
  },
};

function StudentDashboardPage({ user }) {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [previousStats, setPreviousStats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStats, setSelectedStats] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);

  useEffect(() => {
    // Load previous stats from local storage
    const storedStats = localStorage.getItem(`stats_${user.email}`);
    if (storedStats) {
      setPreviousStats(JSON.parse(storedStats));
    }
  }, [user.email]);

  const handleJoin = (e) => {
    e.preventDefault();
    const grid = grids[code];
    if (grid) {
      navigate(`/game/${code}`, { state: { grid } });
    } else {
      alert('Invalid code. Please try again.');
    }
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
                {stat.date} - {stat.topic} - {stat.timeTaken}s
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
            <p>Time Taken: {selectedStats.timeTaken}s</p>
            {!showFlashcards ? (
              <>
                <ul className="stats-modal__list">
                  {selectedStats.wordsWithDefinitions.map((wordObj, idx) => (
                    <li key={idx}>
                      <strong>{wordObj.word}</strong>: {wordObj.definition}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowFlashcards(true)} className="stats-modal__button">
                  View as Flashcards
                </button>
              </>
            ) : (
              <>
                <Flashcards wordsWithDefinitions={selectedStats.wordsWithDefinitions} />
                <button onClick={() => setShowFlashcards(false)} className="stats-modal__button">
                  Back to List
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default StudentDashboardPage;
