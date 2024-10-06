import React, { useState, useEffect } from 'react';
import WordSearchGame from '../components/WordSearchGame/WordSearchGame';
import { useParams, useNavigate } from 'react-router-dom';
import './WordSearchGamePage.scss';

function WordSearchGamePage({ user }) {
  const { code } = useParams();
  const navigate = useNavigate();
  const [gridData, setGridData] = useState(null);
  const [definitions, setDefinitions] = useState({});
  const [foundWords, setFoundWords] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Fetch grid data from backend using code
    // For now, we'll use dummy data
    setGridData([
      ['C', 'A', 'T', 'S'],
      ['D', 'O', 'G', 'S'],
      ['B', 'I', 'R', 'D'],
      ['F', 'I', 'S', 'H'],
    ]);
    setDefinitions({
      CAT: 'A small domesticated carnivorous mammal.',
      DOG: 'A domesticated carnivorous mammal that typically has a long snout.',
      BIRD: 'A warm-blooded egg-laying vertebrate.',
      FISH: 'A limbless cold-blooded vertebrate animal with gills and fins.',
    });
  }, [code]);

  useEffect(() => {
    let interval = null;
    if (!gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (gameOver && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  const handleWordFound = (word) => {
    setFoundWords((prev) => [...prev, word]);
    // Show definition modal
    alert(`Definition of ${word}: ${definitions[word]}`);
    if (foundWords.length + 1 === Object.keys(definitions).length) {
      setGameOver(true);
      // Show stats modal
      alert(`Game Over! Time taken: ${timer} seconds`);
      // Redirect back to dashboard after a delay
      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="word-search-game-page">
      <div className="timer">Time: {timer}s</div>
      {gridData && (
        <WordSearchGame gridData={gridData} onWordFound={handleWordFound} />
      )}
    </div>
  );
}

export default WordSearchGamePage;
