import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Style/Journalinfo.css';

const JournalInfo = () => {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/")
            .then(response => setJournals(response.data))
            .catch(error => console.error("Error fetching journals:", error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/journals/${id}`);
            setJournals(journals.filter(journal => journal._id !== id));
        } catch (error) {
            console.error("Error deleting journal:", error);
        }
    };

    return (
        <div>
            <h2>JOURNAL INFO</h2>
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
                        {journals.map((journal, index) => (
                            <tr key={index}>
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
