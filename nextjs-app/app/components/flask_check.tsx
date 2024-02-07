async function check() {
  const res = await fetch('http://localhost:5001/check', { cache: 'no-store' })
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function FlaskCheck() {
  const data = await check()

  console.log(data);  

  return (
    <div className="flex items-center mb-6">
      Flask server status: {data.status}
    </div>
  );
}
