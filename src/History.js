import React from 'react';
import './App.css';

function History({ history, setInput }) {
  return (
    <div className='history'>
      <h2>History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index} onClick={() => setInput(entry.split(' = ')[0])}>
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;