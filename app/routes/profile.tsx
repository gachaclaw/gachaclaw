import { NavLink, Outlet, useLocation, Navigate } from "react-router";
import { useLogout } from "app/useLogout";

export default function Profile() {
  const location = useLocation();
  const handleLogout = useLogout();

  if (location.pathname === "/profile") {
    return <Navigate to="myprofile" replace />;
  }

  const pageTitle = (() => {
    if (location.pathname.includes("stats")) return "Stats";
    if (location.pathname.includes("alerts")) return "Alerts";
    if (location.pathname.includes("account")) return "Account";
    if (location.pathname.includes("security")) return "Security";
    if (location.pathname.includes("gameplay")) return "Gameplay";
    if (location.pathname.includes("preferences")) return "Preferences";
    if (location.pathname.includes("appearance")) return "Appearance";
    if (location.pathname.includes("myprofile")) return "My Profile";
    return "Profile";
  })();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block px-3 py-2 bg-blue-900 rounded text-blue-300 font-medium"
      : "block px-3 py-2 text-gray-300 hover:bg-gray-700 rounded";

  return (
    <div className="px-4 py-8">
      <div className="flex justify-center">
        <div className="flex w-full max-w-6xl gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 space-y-4">
            <h1 className="text-2xl font-semibold text-white">{pageTitle}</h1>

            {/* Profile Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Profile</h2>
              <nav className="space-y-2">
                <NavLink to="myprofile" className={linkClass}>My Profile</NavLink>
                <NavLink to="stats" className={linkClass}>Stats</NavLink>
                <NavLink to="alerts" className={linkClass}>Alerts</NavLink>
              </nav>
            </div>

            {/* Settings Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-3">Settings</h2>
              <nav className="space-y-2">
                <NavLink to="account" className={linkClass}>Account</NavLink>
                <NavLink to="security" className={linkClass}>Security</NavLink>
                <NavLink to="gameplay" className={linkClass}>Gameplay</NavLink>
                <NavLink to="preferences" className={linkClass}>Preferences</NavLink>
                <NavLink to="appearance" className={linkClass}>Appearance</NavLink>
              </nav>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Log Out
            </button>
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
