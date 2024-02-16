import { checkAPI } from "../actions";

export default async function FlaskCheck() {
  const status = await checkAPI();

  console.log(status);  

  return (
    <div className="flex items-center mb-6">
      FastAPI server status: {status}
    </div>
  );
}
