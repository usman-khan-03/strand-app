import React, { useState } from 'react';
import axios from 'axios';
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

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/create_word_search', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log('Word search generated:', response.data);
      // Handle success (e.g., show a success message, clear the form, etc.)
    } catch (error) {
      console.error('Error generating word search:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      alert(errorMessage);
    }
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