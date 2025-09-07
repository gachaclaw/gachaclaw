import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext"
export default function Stats() {
    const { currency, prizesWon } = useCurrency();
  return (
    <>
      <div className="space-y-12">
        <div>Prizes won: {prizesWon}</div>
      </div>
    </>
  );
}
