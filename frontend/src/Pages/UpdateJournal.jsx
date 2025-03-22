import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateJournal = () => {
    const { journal_id } = useParams();
    const navigate = useNavigate();
    const [journal, setJournal] = useState({ title: '', content: '' });

    useEffect(() => {
        axios.get(`http://localhost:3001/journal/${journal_id}`)
            .then(response => setJournal(response.data))
            .catch(error => console.error("Error fetching journal:", error));
    }, [journal_id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updatejournal/${journal_id}`, journal)
            .then(() => navigate('/'))
            .catch(err => console.error("Error updating journal:", err));
    };

    return (
        <div>
            <h2>Update Journal</h2>
            <form onSubmit={handleUpdate}>
                <label>Title</label>
                <input 
                    type="text" 
                    value={journal.title} 
                    onChange={(e) => setJournal({ ...journal, title: e.target.value })} 
                />
                <label>Content</label>
                <textarea 
                    value={journal.content} 
                    onChange={(e) => setJournal({ ...journal, content: e.target.value })} 
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateJournal;
