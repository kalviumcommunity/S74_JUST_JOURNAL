import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Style/Journalinfo.css';

const JournalInfo = () => {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/journals")
            .then(response => setJournals(response.data))
            .catch(error => console.error("Error fetching journals:", error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/journals/${id}`);
            setJournals(prevJournals => prevJournals.filter(journal => journal._id !== id));
        } catch (error) {
            console.error("Error deleting journal:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div className="header">
                <h2>JOURNAL INFO</h2>
                <div className="auth-buttons">
                    <Link to="/signup">
                        <button className="signup-btn">Signup</button>
                    </Link>
                    <Link to="/login">
                        <button className="login-btn">Login</button>
                    </Link>
                </div>
            </div>
            <br />
            <button><Link to="/create">Add Journal +</Link></button>
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Journal</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journals.map((journal) => (
                            <tr key={journal._id}>
                                <td>{journal.date}</td>
                                <td>{journal.title}</td>
                                <td>{journal.content}</td>
                                <td>
                                    <Link to={`/update/${journal._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(journal._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JournalInfo;
