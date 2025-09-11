import { useState, useEffect } from "react";
import { fetchUserStats } from "src/context/fetchUserStats";
import { updateUserStats } from "src/context/updateUserStats";

export default function Appearance() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("CST");
  const [timeFormat, setTimeFormat] = useState("military");
  const [showAnimations, setShowAnimations] = useState(true);
  const [loading, setLoading] = useState(true);

  // Load appearance settings from backend
  useEffect(() => {
    const loadAppearanceSettings = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserStats(email);
        setTheme(data.theme);
        setLanguage(data.language);
        setTimezone(data.timezone);
        setTimeFormat(data.time_format);
        setShowAnimations(data.show_animations);
      } catch (error) {
        console.error("Error loading appearance settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppearanceSettings();
  }, []);

  // Update backend when settings change
  const updateSetting = async (field: string, value: string | boolean) => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      await updateUserStats({
        email,
        [field]: value,
      });
      console.log(`Updated ${field}:`, value);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateSetting('theme', newTheme);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    updateSetting('language', newLanguage);
  };

  const handleTimezoneChange = (newTimezone: string) => {
    setTimezone(newTimezone);
    updateSetting('timezone', newTimezone);
  };

  const handleTimeFormatChange = (newTimeFormat: string) => {
    setTimeFormat(newTimeFormat);
    updateSetting('time_format', newTimeFormat);
  };

  const toggleAnimations = () => {
    const newValue = !showAnimations;
    setShowAnimations(newValue);
    updateSetting('show_animations', newValue);
  };

  if (loading) {
    return (
      <div className="p-4 text-white space-y-6">
        <h2 className="text-2xl font-bold">APPEARANCE</h2>
        <div className="space-y-4">
          <div className="h-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-white space-y-6">
      <h2 className="text-2xl font-bold">APPEARANCE</h2>

      {/* Theme Selector */}
      <div>
        <label className="block mb-1 font-medium">Theme</label>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
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
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
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
          onChange={(e) => handleTimezoneChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
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
          onChange={(e) => handleTimeFormatChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
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