// App.js (React Component)
import React, { useState } from 'react';
import './App.css';
import Calculator from './Calculator';
import History from './History';

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]); // For store the history status
  
  return (
    <div className='app-container'>
      <Calculator
        input={input}
        setInput={setInput}
        history={history}
        setHistory={setHistory}
      />
      <History history={history} setInput={setInput} />
    </div>
  );
}

export default App;