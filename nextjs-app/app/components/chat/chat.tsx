'use client';

import History from "./history";
import { useState } from 'react';

export default function Chat() {
  const [history, setHistory] = useState([
    {type: 'user', message: 'hello!'},
    {type: 'bot', message: 'hi!'},
  ]);
  const [input, setInput] = useState('');

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setHistory(history.concat([{type: 'user', message: input}]));
      setInput('');

      getAnswer(input);
    }
  };

  async function getAnswer(input: string) {
    console.log(input);

    const res = await fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: input }),
    })
    const data = await res.json();
  
    setHistory(prevHistory => prevHistory.concat([{type: 'bot', message: data.answer}]));
  }

  return (
    <div class="flex flex-col w-1/3">
      <History items={history} />
      <div className="w-2/3 pr-5">
        <input 
          className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" 
          type="text" 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={ input }
        />
      </div>
    </div>
  );
}
