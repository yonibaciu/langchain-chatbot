export async function POST(request: Request) {
  const requestData = await request.json()
  const res = await fetch('http://localhost:5001/load_webpage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: requestData.url }),
  })
 
  const data = await res.json()
 
  return Response.json(data)
}
