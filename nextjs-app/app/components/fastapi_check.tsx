export default async function FlaskCheck() {
  function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function check() {
    try {
      await timeout(1000); // forcing a delay to see Suspense working
      const res = await fetch('http://localhost:5001/check', { cache: 'no-store' })
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

  const status = await check();

  console.log(status);  

  return (
    <div className="flex items-center mb-6">
      FastAPI server status: {status}
    </div>
  );
}
