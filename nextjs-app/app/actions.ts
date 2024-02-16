'use server';

const FASTAPI_SERVER = 'http://localhost:8000';

export async function askQuestion(question: string) {
  const res = await fetch(`${FASTAPI_SERVER}/question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: question }),
  });
 
  const data = await res.json()
 
  return data;
}

export async function loadUrl(url: string) {
  const res = await fetch(`${FASTAPI_SERVER}/load_webpage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url }),
  });
 
  const data = await res.json()
 
  console.log(data);
  return data;
}

export async function checkAPI() {
  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  try {
    await timeout(1000); // forcing a delay to see Suspense working
    const res = await fetch(`${FASTAPI_SERVER}/check`, { cache: 'no-store' })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    const data = await res.json()
    return data.status;
  } catch (error) {
    return 'NOT OK! Probaby the FastAPI service is not running.';
  }
}
