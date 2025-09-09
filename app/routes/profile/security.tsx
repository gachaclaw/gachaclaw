import { useCurrency } from "src/context/CurrencyContext";

export default function Security() {
  const { currency, addCredits } = useCurrency();

  return (
    <div className="p-4 space-y-4 text-white">
      <h2 className="text-2xl font-bold">SECURITY</h2>
      <p>Credits: {currency}</p>
      <button
        onClick={addCredits}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add 5 Credits
      </button>
      <hr className="my-6 border-gray-600" />
      <div className="flex items-center gap-2">
        <p className="text-lg">
          Two-Step Verification: <span className="font-semibold">Enabled</span>
        </p>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
          onClick={() => console.log("Change two-step verification clicked")}
        >
          Change
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Password</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Existing password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1">New password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1">Confirm new password:</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          onClick={() => console.log("Save password clicked")} // placeholder
        >
          Save
        </button>
      </div>
    </div>
  );
}
