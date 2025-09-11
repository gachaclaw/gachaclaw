import { useCurrency } from "src/context/CurrencyContext";

export default function Stats() {
  const { prizesWon, gamesPlayed, creditsSpent, currency, isLoading, refreshStats } = useCurrency();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 text-white">
        <h2 className="text-2xl font-bold">STATS</h2>
        <div className="space-y-2">
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">STATS</h2>
        <button
          onClick={refreshStats}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-gray-300">Current Credits:</span>
          <span className="text-green-400 font-bold">{currency ?? 0}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-gray-300">Prizes Won:</span>
          <span className="text-yellow-400 font-bold">{prizesWon ?? 0}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-gray-300">Games Played:</span>
          <span className="text-blue-400 font-bold">{gamesPlayed ?? 0}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
          <span className="text-gray-300">Credits Spent:</span>
          <span className="text-red-400 font-bold">{creditsSpent ?? 0}</span>
        </div>
      </div>
    </div>
  );
}