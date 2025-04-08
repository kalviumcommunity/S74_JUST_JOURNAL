import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JournalInfo from './Pages/JournalInfo';
import CreateJournal from './Pages/CreateJournal';
import UpdateJournal from './Pages/UpdateJournal';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JournalInfo />} />
        <Route path="/create" element={<CreateJournal />} />
        <Route path="/update/:journal_id" element={<UpdateJournal />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
