import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import WordSearchGame from '../components/WordSearchGame/WordSearchGame';
import './WordSearchGamePage.scss';

function WordSearchGamePage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [gridData, setGridData] = useState(null);
  const [words, setWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        console.log('Fetching puzzle with code:', code);
        const response = await axios.post('http://127.0.0.1:5000/api/generate-puzzle', 
          { code },
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log('Server response:', response.data);
        if (response.data.success) {
          setGridData(response.data.puzzle);
          setWords(response.data.words);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching puzzle:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        setError('Failed to fetch puzzle. Please try again.');
      }
    };

    if (code) {
      fetchPuzzle();
    }
  }, [code]);


  useEffect(() => {
    let interval = null;
    if (gridData && !gameOver) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (gameOver && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gridData, gameOver]);

  const handleWordFound = (word) => {
    setFoundWords((prevFoundWords) => [...prevFoundWords, word]);
    if (foundWords.length + 1 === words.length) {
      setGameOver(true);
      alert(`Congratulations! You found all words. Time taken: ${timer} seconds`);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="word-search-game-page">
      {!gridData ? (
        <div>Loading puzzle...</div>
      ) : (
        <>
          <div className="timer">Time: {timer}s</div>
          <div className="words-to-find">
            Words to find: {words.join(', ')}
          </div>
          <div className="found-words">
            Found words: {foundWords.join(', ')}
          </div>
          <WordSearchGame gridData={gridData} words={words} onWordFound={handleWordFound} />
        </>
      )}
    </div>
  );
}

export default WordSearchGamePage;