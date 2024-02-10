'use client';
import { useState } from 'react';
import { loadUrl } from '../actions';

export default function UrlLoader() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function onClickUrl() {
    setLoading(true);
    console.log(input);

    const data = await loadUrl(input);
  
    setLoading(false);
    setInput('');
  }

  return (
    <form className="w-1/2">
      <div className="flex items-center pb-6 mb-6 border-b-2 border-blue-900">
        <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          Url
        </label>
        <div className="w-2/3 pr-5">
          <input 
            className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" 
            type="text" 
            placeholder="Enter webpage url"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button 
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
          type="button"
          onClick={ () => onClickUrl() }
        >
          { loading? 'Loading...' : 'Load' }
        </button>
      </div>
    </form>
  )
}
