export default async function FlaskCheck() {
  async function check() {
    try {
      const res = await fetch('http://localhost:5001/check', { cache: 'no-store' })
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      const data = await res.json()
      return data.status;
    } catch (error) {
      return 'NOT OK! Probaby the flask service is not running.';
    }
  }

  const status = await check();

  console.log(status);  

  return (
    <div className="flex items-center mb-6">
      Flask server status: {status}
    </div>
  );
}
