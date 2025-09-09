import { useState } from "react";

export default function Gameplay() {
  const [showTips, setShowTips] = useState(true);
  const [confirmSpend, setConfirmSpend] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [resolution, setResolution] = useState("1920x1080");
  const [theme, setTheme] = useState("Classic");
  const [speed, setSpeed] = useState("Normal");
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(50);

  return (
    <div className="p-4 text-white space-y-6">
      <h2 className="text-2xl font-bold">GAMEPLAY</h2>

      {/* Gameplay Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Gameplay</h3>

        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => setShowTips((prev) => !prev)}
            className={`w-6 h-6 rounded border ${
              showTips ? "bg-green-500 border-green-500" : "bg-gray-700 border-gray-500"
            } flex items-center justify-center`}
          >
            {showTips ? "✔" : ""}
          </button>
          <span>Show Tutorial Tips</span>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => setConfirmSpend((prev) => !prev)}
            className={`w-6 h-6 rounded border ${
              confirmSpend ? "bg-green-500 border-green-500" : "bg-gray-700 border-gray-500"
            } flex items-center justify-center`}
          >
            {confirmSpend ? "✔" : ""}
          </button>
          <span>Confirm Before Spending Credits</span>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Game Resolution</label>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
          >
            <option>1920x1080</option>
            <option>1600x900</option>
            <option>1280x720</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Game Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
          >
            <option>Classic</option>
            <option>Neon</option>
            <option>Retro</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Game Speed</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
          >
            <option>Slow</option>
            <option>Normal</option>
            <option>Fast</option>
          </select>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => setAutoplay((prev) => !prev)}
            className={`w-6 h-6 rounded border ${
              autoplay ? "bg-green-500 border-green-500" : "bg-gray-700 border-gray-500"
            } flex items-center justify-center`}
          >
            {autoplay ? "✔" : ""}
          </button>
          <span>Autoplay</span>
        </div>
      </div>

      <hr className="border-gray-600" />

      {/* Audio Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Audio</h3>

        <div className="mb-4">
          <label className="block mb-1">Music Volume</label>
          <input
            type="range"
            min="0"
            max="100"
            value={musicVolume}
            onChange={(e) => setMusicVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Sound Effects Volume</label>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVolume}
            onChange={(e) => setSfxVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
