import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import JournalInfo from './Pages/JournalInfo';
import CreateJournal from './Pages/CreateJournal';
import UpdateJournal from './Pages/UpdateJournal';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JournalInfo/>}></Route>
          <Route path="/create" element={<CreateJournal/>}></Route>
          <Route path="/update/:journal_id" element={<UpdateJournal />} />

        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
