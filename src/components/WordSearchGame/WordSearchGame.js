import React, { useState } from 'react';
import './WordSearchGame.scss';

function WordSearchGame({ gridData, onWordFound, wordsToFind }) {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const handleMouseDown = (rowIndex, colIndex) => {
    setSelectedCells([{ row: rowIndex, col: colIndex }]);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (selectedCells.length > 0) {
      setSelectedCells([...selectedCells, { row: rowIndex, col: colIndex }]);
    }
  };

  const handleMouseUp = () => {
    const selectedWord = selectedCells
      .map(({ row, col }) => gridData[row][col])
      .join('');

    // Check if the selected word is in the list
    if (wordsToFind.includes(selectedWord)) {
      onWordFound(selectedWord);
      setFoundWords([...foundWords, ...selectedCells]);
    }

    setSelectedCells([]);
  };

  const isCellSelected = (rowIndex, colIndex) => {
    return selectedCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex
    );
  };

  const isCellFound = (rowIndex, colIndex) => {
    return foundWords.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex
    );
  };

  return (
    <div
      className="word-search-game"
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setSelectedCells([])}
    >
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="word-search-game__row">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className={`word-search-game__cell
                ${isCellSelected(rowIndex, colIndex) ? 'selected' : ''}
                ${isCellFound(rowIndex, colIndex) ? 'found' : ''}
              `}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WordSearchGame;
