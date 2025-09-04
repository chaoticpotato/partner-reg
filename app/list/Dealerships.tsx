import { getDealerships } from "../lib/actions";
import DealershipsList from "./DealershipsList";

export default async function Dealerships() {
  const result = await getDealerships({ delayInSecs: 0 }); // for simulate server delay

  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-xs mx-auto">
        <p className="text-red-600">{result.error || "Something went wrong"}</p>
      </div>
    );
  }

  if (result.data.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-xs mx-auto">
        <p className="text-blue-600">No dealership yet</p>
      </div>
    );
  }

  return <DealershipsList data={result.data} />;
}
