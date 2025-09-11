import { useState, useEffect, useCallback, useRef } from "react";
import { fetchUserStats } from "src/context/fetchUserStats";
import { updateUserStats } from "src/context/updateUserStats";

export default function Gameplay() {
  const [showTips, setShowTips] = useState(true);
  const [confirmSpend, setConfirmSpend] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [resolution, setResolution] = useState("1920x1080");
  const [theme, setTheme] = useState("Classic");
  const [speed, setSpeed] = useState("Normal");
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [loading, setLoading] = useState(true);

  // Refs for debouncing audio sliders
  const musicVolumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sfxVolumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load gameplay settings from backend
  useEffect(() => {
    const loadGameplaySettings = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserStats(email);
        setShowTips(data.show_tips);
        setConfirmSpend(data.confirm_spend);
        setAutoplay(data.autoplay);
        setResolution(data.game_resolution);
        setTheme(data.game_theme);
        setSpeed(data.game_speed);
        setMusicVolume(data.music_volume);
        setSfxVolume(data.sfx_volume);
      } catch (error) {
        console.error("Error loading gameplay settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGameplaySettings();
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (musicVolumeTimeoutRef.current) {
        clearTimeout(musicVolumeTimeoutRef.current);
      }
      if (sfxVolumeTimeoutRef.current) {
        clearTimeout(sfxVolumeTimeoutRef.current);
      }
    };
  }, []);

  // Update backend when settings change
  const updateSetting = async (field: string, value: string | boolean | number) => {
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

  // Handler functions
  const handleShowTipsToggle = () => {
    const newValue = !showTips;
    setShowTips(newValue);
    updateSetting('show_tips', newValue);
  };

  const handleConfirmSpendToggle = () => {
    const newValue = !confirmSpend;
    setConfirmSpend(newValue);
    updateSetting('confirm_spend', newValue);
  };

  const handleAutoplayToggle = () => {
    const newValue = !autoplay;
    setAutoplay(newValue);
    updateSetting('autoplay', newValue);
  };

  const handleResolutionChange = (newResolution: string) => {
    setResolution(newResolution);
    updateSetting('game_resolution', newResolution);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateSetting('game_theme', newTheme);
  };

  const handleSpeedChange = (newSpeed: string) => {
    setSpeed(newSpeed);
    updateSetting('game_speed', newSpeed);
  };

  // Debounced audio volume handlers to prevent rapid API calls
  const handleMusicVolumeChange = useCallback((newVolume: number) => {
    setMusicVolume(newVolume);
    
    // Clear existing timeout
    if (musicVolumeTimeoutRef.current) {
      clearTimeout(musicVolumeTimeoutRef.current);
    }
    
    // Set new timeout to update backend after 300ms of no changes
    musicVolumeTimeoutRef.current = setTimeout(() => {
      updateSetting('music_volume', newVolume);
    }, 300);
  }, []);

  const handleSfxVolumeChange = useCallback((newVolume: number) => {
    setSfxVolume(newVolume);
    
    // Clear existing timeout
    if (sfxVolumeTimeoutRef.current) {
      clearTimeout(sfxVolumeTimeoutRef.current);
    }
    
    // Set new timeout to update backend after 300ms of no changes
    sfxVolumeTimeoutRef.current = setTimeout(() => {
      updateSetting('sfx_volume', newVolume);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-white space-y-6">
        <h2 className="text-2xl font-bold">GAMEPLAY</h2>
        <div className="space-y-4">
          <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-white space-y-6">
      <h2 className="text-2xl font-bold">GAMEPLAY</h2>

      {/* Gameplay Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Gameplay</h3>

        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={handleShowTipsToggle}
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
            onClick={handleConfirmSpendToggle}
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
            onChange={(e) => handleResolutionChange(e.target.value)}
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
            onChange={(e) => handleThemeChange(e.target.value)}
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
            onChange={(e) => handleSpeedChange(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600"
          >
            <option>Slow</option>
            <option>Normal</option>
            <option>Fast</option>
          </select>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={handleAutoplayToggle}
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
          <label className="block mb-1">Music Volume ({musicVolume}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={musicVolume}
            onChange={(e) => handleMusicVolumeChange(Number(e.target.value))}
            className="w-full accent-violet-500"
          />
        </div>

        <div>
          <label className="block mb-1">Sound Effects Volume ({sfxVolume}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVolume}
            onChange={(e) => handleSfxVolumeChange(Number(e.target.value))}
            className="w-full accent-violet-500"
          />
        </div>
      </div>
    </div>
  );
}
