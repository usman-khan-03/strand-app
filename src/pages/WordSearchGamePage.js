import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import WordSearchGame from '../components/WordSearchGame/WordSearchGame';
import './WordSearchGamePage.scss';

function WordSearchGamePage({ user }) {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [gridData, setGridData] = useState(null);
  const [gridTitle, setGridTitle] = useState('');
  const [wordsToFind, setWordsToFind] = useState([]);
  const [wordsWithDefinitions, setWordsWithDefinitions] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (location.state && location.state.grid) {
      const { grid } = location.state;
      setGridTitle(grid.title);
      setWordsWithDefinitions(grid.wordsWithDefinitions);
      const words = grid.wordsWithDefinitions.map((w) => w.word);
      setWordsToFind(words);
      generateGrid(words);
    } else {
      alert('Invalid grid data.');
      navigate('/');
    }
  }, [location.state, navigate]);

  const generateGrid = (words) => {
    // Simple grid generation logic for demonstration purposes
    // For a real application, you'd use a proper algorithm to place words
    const gridSize = 12;
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => '')
    );

    // Place words horizontally for simplicity
    words.forEach((word, idx) => {
      const row = idx;
      for (let i = 0; i < word.length; i++) {
        grid[row][i] = word[i];
      }
    });

    // Fill empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!grid[i][j]) {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGridData(grid);
  };

  const handleWordFound = (word) => {
    if (!foundWords.includes(word)) {
      setFoundWords((prev) => [...prev, word]);

      if (foundWords.length + 1 === wordsToFind.length) {
        setGameOver(true);

        // Store game result
        const gameResult = {
          topic: gridTitle,
          date: new Date().toLocaleDateString(),
          timeTaken: timer,
          wordsWithDefinitions,
        };

        // Save the game result to local storage
        saveGameResult(gameResult);

        // Show completion modal
      }
    }
  };

  const saveGameResult = (gameResult) => {
    const storedStats = localStorage.getItem(`stats_${user.email}`);
    const stats = storedStats ? JSON.parse(storedStats) : [];
    stats.push(gameResult);
    localStorage.setItem(`stats_${user.email}`, JSON.stringify(stats));
  };

  const handleQuit = () => {
    const confirmQuit = window.confirm(
      'Are you sure you want to quit? Your progress will not be saved.'
    );
    if (confirmQuit) {
      navigate('/');
    }
  };

  return (
    <div className="word-search-game-page">
      <h2>{gridTitle}</h2>
      <div className="timer">Time: {timer}s</div>
      {gridData && (
        <>
          <WordSearchGame
            gridData={gridData}
            onWordFound={handleWordFound}
            wordsToFind={wordsToFind}
          />
          <button className="finish-button" onClick={handleQuit}>
            Quit
          </button>
        </>
      )}
      {gameOver && (
        <Modal isOpen={gameOver} onClose={() => navigate('/')}>
          <div className="game-over-modal">
            <h2>Congratulations!</h2>
            <p>You found all the words in {timer} seconds.</p>
            <button onClick={() => navigate('/')}>Return to Dashboard</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default WordSearchGamePage;
