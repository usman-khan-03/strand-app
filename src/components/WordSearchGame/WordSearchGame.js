import React from 'react';
import './WordSearchGame.scss';

function WordSearchGame({ gridData, onWordFound }) {
  // Implement the word search game logic here

  return (
    <div className="word-search-game">
      {/* Render the grid */}
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="word-search-game__row">
          {row.map((letter, colIndex) => (
            <div key={colIndex} className="word-search-game__cell">
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WordSearchGame;
