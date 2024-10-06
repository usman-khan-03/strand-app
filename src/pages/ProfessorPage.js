// import React, { useState } from 'react';
// import axios from 'axios';
// import './ProfessorPage.scss';

// function ProfessorPage({ user }) {
//   const [formData, setFormData] = useState({
//     topic: '',
//     date: '',
//     code: '',
//     words: ['', '', '', '', '', ''],
//   });

//   const handleWordChange = (index, value) => {
//     const newWords = [...formData.words];
//     newWords[index] = value;
//     setFormData({ ...formData, words: newWords });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/create_word_search', formData, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//       });
//       console.log('Word search generated:', response.data);
//       // Handle success (e.g., show a success message, clear the form, etc.)
//     } catch (error) {
//       console.error('Error generating word search:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
//       alert(errorMessage);
//     }
//   };

//   return (
//     <div className="professor-page">
//       <h2>Create a Word Search</h2>
//       <form className="professor-page__form" onSubmit={handleGenerate}>
//         <input
//           type="text"
//           name="topic"
//           placeholder="Topic"
//           value={formData.topic}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="code"
//           placeholder="Code"
//           value={formData.code}
//           onChange={handleChange}
//           required
//         />
//         <div className="professor-page__words">
//           {formData.words.map((word, index) => (
//             <input
//               key={index}
//               type="text"
//               placeholder={`Word ${index + 1}`}
//               value={word}
//               onChange={(e) => handleWordChange(index, e.target.value)}
//               required
//             />
//           ))}
//         </div>
//         <button type="submit">Generate Word Search</button>
//       </form>
//     </div>
//   );
// }

// export default ProfessorPage;

// import React, { useState } from 'react';
// import './ProfessorPage.scss';

// function ProfessorPage({ user }) {
//   const [formData, setFormData] = useState({
//     topic: '',
//     date: '',
//     code: '',
//     words: ['', '', '', '', '', ''],
//   });

//   const handleWordChange = (index, value) => {
//     const newWords = [...formData.words];
//     newWords[index] = value;
//     setFormData({ ...formData, words: newWords });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     // Include the professor's email in the data sent to the backend
//     const dataToSend = {
//       ...formData,
//       email: user.email,
//     };
//     try {
//       const response = await fetch('http://localhost:5000/api/professor_data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         console.log('Word search generated successfully:', result);
//       } else {
//         console.error('Error generating word search:', result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="professor-page">
//       <h2>Create a Word Search</h2>
//       <form className="professor-page__form" onSubmit={handleGenerate}>
//         <input
//           type="text"
//           name="topic"
//           placeholder="Topic"
//           value={formData.topic}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="code"
//           placeholder="Code"
//           value={formData.code}
//           onChange={handleChange}
//           required
//         />
//         <div className="professor-page__words">
//           {formData.words.map((word, index) => (
//             <input
//               key={index}
//               type="text"
//               placeholder={`Word ${index + 1}`}
//               value={word}
//               onChange={(e) => handleWordChange(index, e.target.value)}
//               required
//             />
//           ))}
//         </div>
//         <button type="submit">Generate Word Search</button>
//       </form>
//     </div>
//   );
// }

// export default ProfessorPage;

import React, { useState } from 'react';
import './ProfessorPage.scss';

function ProfessorPage() {
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
    const dataToSend = {
      ...formData,
    };
    try {
      const response = await fetch('http://localhost:5000/api/professor_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
        credentials: 'include',  // Include credentials
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Word search generated successfully:', result);
        // Handle success (e.g., show a success message)
      } else {
        console.error('Error generating word search:', result.message);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
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
