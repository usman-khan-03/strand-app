import React, { useState } from 'react';
import './Flashcards.scss';

function Flashcards({ wordsWithDefinitions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const handleNext = () => {
    setShowDefinition(false);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === wordsWithDefinitions.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flashcards">
      <div
        className={`flashcard ${showDefinition ? 'show-definition' : ''}`}
        onClick={() => setShowDefinition(!showDefinition)}
      >
        <div className="flashcard__front">
          {wordsWithDefinitions[currentIndex].word}
        </div>
        <div className="flashcard__back">
          {wordsWithDefinitions[currentIndex].definition}
        </div>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Flashcards;
