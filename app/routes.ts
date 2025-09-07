import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"), 
    route("about","routes/about.tsx"),
    route("post/:postId", "routes/post.tsx"),
    route("ponggame", "routes/pong-game.tsx"),
    route("login", "routes/login.tsx"),
    route("signupform", "routes/signupform.tsx"),
    route("games", "routes/games.tsx"),

    // nested routes
    route("profile", "routes/profile.tsx", [
        route("stats", "routes/profile/stats.tsx"),
        route("alerts", "routes/profile/alerts.tsx"),
        route("account", "routes/profile/account.tsx"),
        route("myprofile", "routes/profile/myprofile.tsx"),
        route("gameplay", "routes/profile/gameplay.tsx"),
        route("preferences", "routes/profile/preferences.tsx"),
        route("security", "routes/profile/security.tsx"),
        route("appearance", "routes/profile/appearance.tsx")
    ]),
    route("dashboard", "routes/dashboard.tsx", /*child route array*/[
        route("finances", "routes/finanes.tsx"),
        route("personal-info", "routes/personal-info.tsx")
    ]),
] satisfies RouteConfig;
