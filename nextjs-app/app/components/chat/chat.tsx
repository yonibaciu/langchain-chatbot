'use client';

import History from "./history";
import { useState } from 'react';

export default function Chat() {
  const [history, setHistory] = useState([
    {type: 'user', message: 'hello!'},
    {type: 'bot', message: 'hi!'},
  ]);

  function writeChat(message: string) {
    setHistory(history.concat([{type: 'user', message: message}]));
  }

  // const data = await check()

  // console.log(data);  

  return (
    <>
      <History items={history} />
      <div className="w-2/3 pr-5">
        <input 
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
          type="text" 
          onChange={(e) => writeChat(e.target.value)}
        />
      </div>
    </>
  );
}
