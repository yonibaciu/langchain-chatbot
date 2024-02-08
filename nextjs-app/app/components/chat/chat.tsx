'use client';

import History from "./history";
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [history, setHistory] = useState([
    {type: 'user', message: 'hello!'},
    {type: 'bot', message: 'hi!'},
  ]);
  const [input, setInput] = useState('');
  const div = useRef(null);

  useEffect(() => {
    if (history.length) {
      div.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [history.length]);  

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setHistory(prevHistory => prevHistory.concat([{type: 'user', message: input}]));
      setInput('');

      getAnswer(input);
    }
  };

  async function getAnswer(input: string) {
    console.log(input);

    setHistory(prevHistory => prevHistory.concat([{type: 'bot', message: 'loading...'}]));

    const res = await fetch('/api/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: input }),
    })
    const data = await res.json();

    // remove 'loading...' message and add answer
    setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1).concat([{type: 'bot', message: data.answer}]));
    div.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  return (
    <div className="flex flex-col w-1/2">
      <History items={history} />
      <div className="flex items-center w-2/3 pb-5" ref={div}>
        <input 
          className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" 
          type="text" 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type message..."
          value={ input }
        />
      </div>
    </div>
  );
}
