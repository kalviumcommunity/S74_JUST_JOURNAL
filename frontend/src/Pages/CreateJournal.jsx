import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Style/Createjournal.css'; // Ensure this file is correctly linked

const CreateJournal = () => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createjournal", { date, title, content })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log("error in submit",err));
  };

  return (
    <div className="container">
      <h2>JOURNAL WRITING</h2>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            className="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            className="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="content">Journal</label>
          <textarea
            className="content"
            maxLength="600"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p style={{ fontSize: '14px', color: '#8b93ff', marginTop: '5px' }}>
            {content.length} / 600 characters
          </p>
        </div>

        <button>Save</button>
      </form>
    </div>
  );
};

export default CreateJournal;
