'use client';
import { useState } from 'react';
import { loadUrl } from '../actions';
import { toast } from 'sonner';

export default function UrlLoader() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function onClickUrl() {
    setLoading(true);
    console.log(input);

    try {
      const data = await loadUrl(input);
      toast.success('Webpage loaded to vector DB');
      setInput('');
    }
    catch (error) {
      toast.error('Webpage failed to load');
    }

    setLoading(false);
  }

  return (
    <form className="w-1/2">
      <div className="flex items-center pb-6 mb-6 border-b-2 border-blue-900">
        <div className="w-2/3 mr-5">
          <input 
            className="bg-white appearance-none border-2 border-purple-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500" 
            type="text" 
            placeholder="Enter webpage url"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button 
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
          type="button"
          onClick={onClickUrl}
        >
          { loading? 'Loading...' : 'Load' }
        </button>
      </div>
    </form>
  )
}
