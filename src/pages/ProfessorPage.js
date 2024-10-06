import React, { useState } from 'react';
import './ProfessorPage.scss';

function ProfessorPage({ user }) {
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    code: '',
    words: ['', '', '', '', '', ''],
  });

  const handleWordChange = (index, value) => {
    const newWords = [...formData.words];
    newWords[index] = value;
    setFormData({ ...formData, words: newWords });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    // Send data to backend
    console.log('Generating word search with data:', formData);
  };

  return (
    <div className="professor-page">
      <h2>Create a Word Search</h2>
      <form className="professor-page__form" onSubmit={handleGenerate}>
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <div className="professor-page__words">
          {formData.words.map((word, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Word ${index + 1}`}
              value={word}
              onChange={(e) => handleWordChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <button type="submit">Generate Word Search</button>
      </form>
    </div>
  );
}

export default ProfessorPage;
