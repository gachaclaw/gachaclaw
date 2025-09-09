import { useState } from "react";

export default function Appearance() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("CST");
  const [timeFormat, setTimeFormat] = useState("military");
  const [showAnimations, setShowAnimations] = useState(true);

  const toggleAnimations = () => setShowAnimations((prev) => !prev);

  return (
    <div className="p-4 text-white space-y-6">
      <h2 className="text-2xl font-bold">APPEARANCE</h2>

      {/* Theme Selector */}
      <div>
        <label className="block mb-1 font-medium">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Language Selector */}
      <div>
        <label className="block mb-1 font-medium">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="en">English (US)</option>
          <option value="es">Spanish</option>
          <option value="jp">Japanese</option>
        </select>
      </div>

      {/* Time Zone Selector */}
      <div>
        <label className="block mb-1 font-medium">Time Zone</label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="CST">CST</option>
          <option value="EST">EST</option>
        </select>
      </div>

      {/* Time Display Format */}
      <div>
        <label className="block mb-1 font-medium">Time Display</label>
        <select
          value={timeFormat}
          onChange={(e) => setTimeFormat(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="military">Military Time</option>
          <option value="ampm">AM / PM</option>
        </select>
      </div>

      {/* Show Web Animations Toggle */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={toggleAnimations}
          className={`w-6 h-6 flex items-center justify-center rounded border ${
            showAnimations
              ? "bg-green-500 border-green-500"
              : "bg-gray-700 border-gray-500"
          }`}
        >
          {showAnimations ? "✔" : ""}
        </button>
        <span className="text-lg">Show Web Animations</span>
      </div>
    </div>
  );
}