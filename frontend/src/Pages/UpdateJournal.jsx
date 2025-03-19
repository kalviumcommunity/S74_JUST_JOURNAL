import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/Createjournal.css';

const UpdateJournal = () => {
    const { journal_id } = useParams(); // Get the journal ID from URL
    const navigate = useNavigate();

    const [journal, setJournal] = useState({
        date: '',
        title: '',
        content: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/journals/${journal_id}`)
            .then(response => setJournal(response.data))
            .catch(error => console.error("Error fetching journal:", error));
    }, [journal_id]);

    const handleChange = (e) => {
        setJournal({ ...journal, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/update/${journal_id}`, journal);
            alert("Journal updated successfully!");
            navigate('/'); // Redirect back to JournalInfo page
        } catch (error) {
            console.error("Error updating journal:", error);
        }
    };

    return (
        <div className="container">
            <h2>EDIT JOURNAL</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input 
                        type="date" 
                        name="date" 
                        className="date" 
                        value={journal.date} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="title" 
                        value={journal.title} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label htmlFor="content">Journal</label>
                    <textarea
                        name="content"
                        className="content"
                        maxLength="600"
                        value={journal.content}
                        onChange={handleChange}
                    />
                    <p style={{ fontSize: '14px', color: '#8b93ff', marginTop: '5px' }}>
                        {journal.content.length} / 600 characters
                    </p>
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default UpdateJournal;
