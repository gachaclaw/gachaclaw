import { useCurrency } from "src/context/CurrencyContext";

export default function Stats() {
  const { currency, prizesWon } = useCurrency();

  // Mock values for now — replace with actual context or backend values later
  const gamesPlayed = 25;
  const creditsSpent = 120;

  return (
    <div className="p-4 space-y-4 text-white">
      <h2 className="text-2xl font-bold">STATS</h2>
      <p>Prizes Won: {prizesWon}</p>
      <p>Games Played: {gamesPlayed}</p>
      <p>Credits Spent: {creditsSpent}</p>
    </div>
  );
}