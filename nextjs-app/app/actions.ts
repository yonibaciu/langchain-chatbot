'use server';

export async function askQuestion(question: string) {
  const res = await fetch('http://localhost:5001/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: question }),
  })
 
  const data = await res.json()
 
  return data;
}

export async function loadUrl(url: string) {
  const res = await fetch('http://localhost:5001/load_webpage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url }),
  })
 
  const data = await res.json()
 
  console.log(data);
  return data;
}
