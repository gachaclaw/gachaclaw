import { useState } from "react";

export default function Preferences() {
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(true);

  const toggleAlerts = () => {
    setAlertsEnabled((prev) => !prev);
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">PREFERENCES</h2>
        
      <div className="flex items-center gap-4">
        <button
          onClick={toggleAlerts}
          className={`w-6 h-6 flex items-center justify-center rounded border ${
            alertsEnabled ? "bg-green-500 border-green-500" : "bg-gray-700 border-gray-500"
          }`}
        >
          {alertsEnabled ? "✔" : ""}
        </button>
        <span className="text-lg">Alerts</span>
      </div>
    </div>
  );
}