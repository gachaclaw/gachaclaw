import { useCurrency } from "src/context/CurrencyContext";

export default function Security() {
  const { currency, addCredits } = useCurrency();

  return (
    <>
      <div>SECURITY</div>
      <p>Credits: {currency}</p>
      <button
        onClick={addCredits}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add 5 Credits
      </button>
    </>
  );
}
