import React, { useState } from 'react';
 import '../Styles/Home.css';
 
 const Home = () => {
   const [journalText, setJournalText] = useState("");
 
   const handleChange = (e) => {
     if (e.target.value.length <= 300) {
       setJournalText(e.target.value);
     }
   };
 
   return (
     <div>
       <h1>WELCOME TO JUST JOURNAL</h1>
       <div className="instruction">
         <p>
           This site is made for users who really want to know about
           what's going on in your life because in this page you are required to
           complete your journal in only 300 characters.
         </p>
       </div>
 
       <div className="journal">
         <label htmlFor="date">Enter Date: </label> 
         <input type="date" />
         <br />
         <br />
         <label htmlFor="journal">Journal Here !!</label>
         <br />
         <br />
         <textarea
           id="journal"
           value={journalText}
           onChange={handleChange}
           maxLength="300"
           placeholder="Write your journal here (max 300 characters)..."
         />
         <p>{journalText.length} / 300</p>
       </div>
     </div>
   );
 };
 
 export default Home;